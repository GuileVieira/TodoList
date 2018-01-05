var dataref
var tab = []
var key
var user = 'guile'
// var userId = firebase.auth().currentUser.uid
function start_db () {
  dataref = firebase.database()
  read()
}

function read () {
  $('.table-tasks tbody td').remove()
  var tasks = dataref.ref('tasks/guile/')
  tasks.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var name = childSnapshot.val().nameTask
      var desc = childSnapshot.val().descTask
      var date = childSnapshot.val().goalDate
      var key = childSnapshot.key

      var rowObj = {
        key: key,
        name: name,
        desc: desc,
        date: date
      }
      tab.push(rowObj)

      $('.table-tasks tbody').append(
        '<tr  id="' + key + '" onclick=tes(id)>'
        + '<td class="date">' + date + '</td>'
        + '<td class="name">' + name + '</td>'
        + '<td class="desc">' + desc + '</td>'
        + '</tr>'
      )
    })
  })
}

function saveData (opt) {
  if (opt == 0) {
    $('.table-tasks td').remove()

    var randRef = dataref.ref('tasks/' + user).push()
    randRef.set({
      goalDate: $("#dateTask").val(),
      nameTask: $("#nameTask").val(),
      descTask: $("#descripTask").val()
    })
  }

  if (opt == 1) {
    $('.table-tasks td').remove()

    var row = key
    var int = 0
    /*var editBtn = document.getElementById('btn-edit')
    editBtn.disabled = true*/
    $("#btn-edit").prop("disabled", true)

    var randRef = dataref.ref('tasks/' + user + '/' + key)
    randRef.set({
      goalDate: $("#dateTask").val(),
      nameTask: $("#nameTask").val(),
      descTask: $("#descripTask").val()
    })
  }

  if (opt == 2) {
    $('.table-tasks td').remove()
    $("#btn-del").prop("disabled", true)
    var ref = dataref.ref('tasks/' + user + '/' + key)
    ref.remove()
  }

  cleanGaps()
}

function tes (key_toChange) {
  var data = document.getElementById('dateTask')
  var name = document.getElementById('nameTask')
  var desc = document.getElementById('descripTask')

  $("#btn-edit").prop("disabled", false)
  $("#btn-del").prop("disabled", false)

  key = key_toChange

  for (let index = 0; index < tab.length; index++) {
    element = tab[index].key
    if (element == key) {
      int = index
      break
    }
  }
  data.value = tab[int].date
  name.value = tab[int].name
  desc.value = tab[int].desc
}

function cleanGaps () {
  $("#dateTask").val("")
  $("#nameTask").val("")
  $("#descripTask").val("")
}
