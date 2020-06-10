(function(){
  $(window).scroll(function () {
      var top = $(document).scrollTop();
      $('.corporate-jumbo').css({
        'background-position': '0px -'+(top/3).toFixed(2)+'px'
      });
      if(top > 50)
        $('.navbar').removeClass('navbar-transparent');
      else
        $('.navbar').addClass('navbar-transparent');
  }).trigger('scroll');
})();

var table = $('.codetable');
$('.sortable th')
    .wrapInner('<span title="sort this column"/>')
    .each(function(){
        var th = $(this),
            thIndex = th.index(),
            inverse = false;
        th.click(function(){
            table.find('td').filter(function(){
                return $(this).index() === thIndex;
            }).sortElements(function(a, b){
                if( $.text([a]) == $.text([b]) )
                    return 0;
                return $.text([a]) > $.text([b]) ?
                    inverse ? -1 : 1
                    : inverse ? 1 : -1;
            }, function(){
                return this.parentNode; 
            });
            inverse = !inverse;
        });
    });

$("#classSubmit").on("submit", function(){

    var values = {};
    $.each($(this).serializeArray(), function(){ values[this.name] = this.value; });

    var data = {
        studentClass: {
            studentID: values["studentID"],
            classID: values["classID"]
        },
        Name: {
            First: values["First"],
            Last: values["Last"]
        }
    };

    $('#formPayload [name="Data"]').val(JSON.stringify(data));
    $('#formPayload').submit();
    return false;
});

var editor = new $.fn.dataTable.Editor( {
  ajax: "../class",
  table: "#classSubmit",
  fields: [{
          label: "First name:",
          name: "users.first_name"
      }, {
          label: "Last name:",
          name: "users.last_name"
      }, {
          label: "Student ID:",
          name: "users.studentid"
      }, {
          label: "Class ID:",
          name: "users.classid",
      }
  ]
});

$('#classSubmit').DataTable( {
  dom: "Bfrtip",
  ajax: {
      url: "../class",
      type: 'POST'
  },
  columns: [
      { data: "users.first_name" },
      { data: "users.last_name" },
      { data: "users.studentid" },
      { data: "users.classid" }
  ],
  select: true,
  buttons: [
      { extend: "create", editor: editor },
      { extend: "edit",   editor: editor },
      { extend: "remove", editor: editor }
  ]
} );