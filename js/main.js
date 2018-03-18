var champData = []

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText))
      } else {
        if (error) error(xhr)
      }
    }
  }
  xhr.open('GET', path, true)
  xhr.send()
}

var version


loadJSON("https://ddragon.leagueoflegends.com/api/versions.json", function (data) {
    version = data[0]
    loadJSON("http://ddragon.leagueoflegends.com/cdn/" + version + "/data/en_US/champion.json", function (data) {
        for (champ in data.data) {
          var champObject = data.data[champ]
          champData.push({
            tags: champObject.tags,
            systemName: champ,
            name: champObject.name,
            title: capitalizeFirstLetter(champObject.title)
          })
        }
        if (localStorage && !localStorage.data && !localStorage.version) {
          renderChamps(champData, true)
        }
        if (localStorage) {
          localStorage.setItem("data", JSON.stringify(champData))
          localStorage.setItem("version", version)
        }
      },
      function (error) {
        console.error(error)
      })
  },
  function (error) {
    console.error(error)
  })


var elem = document.querySelector('.collapsible')
M.Collapsible.init(elem)

var elem = document.querySelectorAll('.tooltipped');
M.Tooltip.init(elem);

var elem = document.querySelector('.modal')
M.Modal.init(elem, {
  onCloseEnd: function () {
    document.getElementById('modalChampImg').src = ''
  }
})


function renderChamps(data, firstRun = false) {
  if (!renderChamps) return;
  var str = ''
  for (i = 0; i < data.length; i++) {
    str += `<div class="col s6 m6 l3 hoverable champWrapper" onclick=showChamp("${
      data[i].systemName
    }")>
            <img class="circle champImg" ${
              firstRun ? 'data-' : ''
            }src="https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${
      data[i].systemName
    }.png">
            <p class="flow-text">${data[i].systemName}</p>
        </div>`
  }
  document.querySelector('#list').innerHTML = str
  if (!firstRun) return;
  [].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
    img.setAttribute('src', img.getAttribute('data-src'))
    img.onload = function () {
      img.removeAttribute('data-src')
    }
  })
}

document.getElementById('searchField').addEventListener('keyup', filterData)

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterData() {
  //Search
  var filter = document.getElementById('searchField').value.toLowerCase()
  var checkbox = document.querySelector('input[name="roleFilter"]:checked').value;
  var newList = []
  for (i = 0; i < champData.length; i++) {
    if (champData[i].name.toLowerCase().includes(filter) || champData[i].systemName.toLowerCase().includes(filter)) {
      if (checkbox == "All" || champData[i].tags.includes(checkbox))
        newList.push(champData[i])
    }
  }
  renderChamps(newList)
}

//Demo Data
var scripts = [{
    name: 'Some script',
    description: 'Some text',
    download: 'https://www.google.com'
  },
  {
    name: 'Some random script',
    description: 'Some good text',
    download: 'https://www.google.com'
  },
  {
    name: 'Some bad script',
    description: 'Some funny text',
    download: 'https://www.google.com'
  }
]

function showChamp(champName) {
  var instance = M.Modal.getInstance(elem)

  var champ = champData.filter(champ => champ.systemName == champName)[0]

  if (!champ) return;

  document.getElementById('modalChampName').innerHTML = champ.name
  document.getElementById('modalChampTitle').innerHTML = champ.title
  var img = document.getElementById('modalChampImg')
  img.setAttribute(
    'data-src',
    'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' +
    champ.name +
    '_0.jpg'
  )

  img.setAttribute('src', img.getAttribute('data-src'))
  img.onload = function () {
    img.removeAttribute('data-src')
  }

  //CARE FOR XSS!
  var str = ''
  for (i = 0; i < scripts.length; i++) {
    var stars = Math.floor(Math.random() * 5) + 1
    str += `<li class="collection-item avatar">
        <a href="${scripts[i].download}">
            <i class="material-icons circle">file_download</i>
        </a>
        <span class="title">${scripts[i].name}</span>
        <p>${scripts[i].description}</p>
        <a href="#!" class="secondary-content">
            ${'<i class="material-icons">star</i>'.repeat(stars)}
            ${'<i class="material-icons">star_outline</i>'.repeat(5 - stars)}
        </a>
        </li>
        `
  }

  document.getElementById('scripts').innerHTML = str

  instance.open()
}

if (localStorage && localStorage.data && localStorage.version) {
  version = localStorage.version
  renderChamps(JSON.parse(localStorage.data), true)
}