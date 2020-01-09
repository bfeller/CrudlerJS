function Crudler(crud, table, row_id, column, val){
  if (row_id && row_id != null) {
    row_id = parseInt(row_id);
  }
  var result ={
    "news"  :  "incomplete",
    "status"   :  "incomplete",
    "response"      :  null
  };
  function get_table(tab){
    return JSON.parse(localStorage.getItem(tab));
  }
  function process(){
    switch(crud){
      case 'create':
        if (table == null) {
          result["news"] = "You need to specify a table";
          result["status"] = "Error";
        } else if(row_id == null){
          var pull = get_table(table);
          if (!pull || pull === null) {
            localStorage.setItem(table, "[]");
            pull = get_table(table);
          }
          var next_id
          if (pull) {
            next_id = pull.length + 1;
          } else {
            next_id = 1;
          };
          if (val && val != null) {
            val.id = next_id
            if (pull) {
              pull.push(val);
              localStorage.removeItem(table);
              localStorage.setItem(table, JSON.stringify(pull));
            } else {
              localStorage.setItem(table, JSON.stringify([val]));
            }
            var ressy = get_table(table);
            result["news"] = "New row successfully added to " + table;
            result["status"] = "Success";
            result["response"] = ressy;
          } else {
            result["news"] = "New table successfully created";
            result["status"] = "Success";
            result["response"] = null

          }

        } else {
          result["news"] = "Leave row field blank to create new, otherwise use update " + table;
          result["status"] = "Error";
        }
        break;
      case 'read':
        if (table == null) {
          result["news"] = "You need to specify a table";
          result["status"] = "Error";
        } else {
          var pull = get_table(table);
          if (pull){
            if (row_id == null){
              result["news"] = "Showing Whole Table";
              result["status"] = "Success";
              result["response"] = pull;
            } else if (column == null) {
              result["status"] = "Success";
              result["response"] = pull.find(x => x.id === row_id);
            } else{
              var ressy = pull.find(x => x.id === row_id)
              result["status"] = "Success";
              result["response"] = ressy[column];
            }
          } else {
            result["news"] = "That table is empty";
            result["status"] = "Fail";
            result["response"] == null

          }
        };
        break;
      case 'update':
        if (table == null) {
          result["news"] = "You need to specify a table";
          result["status"] = "Error";
        } else if (row_id == null) {
          result["news"] = "You need to specify an object/row";
          result["status"] = "Error";
        } else if (column == null) {
          var pull = get_table(table);
          pull.find(x => x.id === row_id) = val;
          localStorage.setItem(table, JSON.stringify(pull));
          result["news"] = "Row Updated";
          result["status"] = "Success";
          result["response"] == pull.find(x => x.id === row_id);
        } else {
          var pull = get_table(table);
          if (pull && pull != null) {
            pull.find(x => x.id === row_id)[column] = val;
            localStorage.setItem(table, JSON.stringify(pull));
            result["news"] = "Row Updated";
            result["status"] = "Success";
            result["response"] == pull[row_id];
          }
        }
        break;
      case 'delete':
        if (table == null){
          localStorage.clear();
          result["news"] = "All LocalStorage Purged";
          result["status"] = "Success";
        } else if (row_id == null){
          localStorage.removeItem(table);
          result["news"] = "Table Purged";
          result["status"] = "Success";
        } else if (column == null) {
          var pull = get_table(table);
          var res_id = null;
          jQuery.each(pull, function( i, val ) {
            if (!(val == null)){
              if (val.id == row_id) {
                res_id = i
              }
            }
          });
          if (res_id == null) {
            result["news"] = "No Matching Row"
            result["status"] = "Fail";
          } else {
            delete pull[res_id];
            localStorage.setItem(table, JSON.stringify(pull));
            result["news"] = "Row Purged from " + table;
            result["status"] = "Success";

          }
        } else {
          var pull = get_table(table);
          pull[row_id][column] == null;
          localStorage.setItem(table, JSON.stringify(pull));
          result["news"] = "Column " + column + " cleared from row " + row_id + " on table " + table;
          result["status"] = "Success";
        }
        break;

    }
  };
  process();
  return result
}
