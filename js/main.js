var json = {
  version: '8.5.2',
  list: [
    'Aatrox',
    'Ahri',
    'Akali',
    'Alistar',
    'Amumu',
    'Anivia',
    'Annie',
    'Ashe',
    'AurelionSol',
    'Azir',
    'Bard',
    'Blitzcrank',
    'Brand',
    'Braum',
    'Caitlyn',
    'Camille',
    'Cassiopeia',
    'Chogath',
    'Corki',
    'Darius',
    'Diana',
    'Draven',
    'DrMundo',
    'Ekko',
    'Elise',
    'Evelynn',
    'Ezreal',
    'Fiddlesticks',
    'Fiora',
    'Fizz',
    'Galio',
    'Gangplank',
    'Garen',
    'Gnar',
    'Gragas',
    'Graves',
    'Hecarim',
    'Heimerdinger',
    'Illaoi',
    'Irelia',
    'Ivern',
    'Janna',
    'JarvanIV',
    'Jax',
    'Jayce',
    'Jhin',
    'Jinx',
    'Kaisa',
    'Kalista',
    'Karma',
    'Karthus',
    'Kassadin',
    'Katarina',
    'Kayle',
    'Kayn',
    'Kennen',
    'Khazix',
    'Kindred',
    'Kled',
    'KogMaw',
    'Leblanc',
    'LeeSin',
    'Leona',
    'Lissandra',
    'Lucian',
    'Lulu',
    'Lux',
    'Malphite',
    'Malzahar',
    'Maokai',
    'MasterYi',
    'MissFortune',
    'MonkeyKing',
    'Mordekaiser',
    'Morgana',
    'Nami',
    'Nasus',
    'Nautilus',
    'Nidalee',
    'Nocturne',
    'Nunu',
    'Olaf',
    'Orianna',
    'Ornn',
    'Pantheon',
    'Poppy',
    'Quinn',
    'Rakan',
    'Rammus',
    'RekSai',
    'Renekton',
    'Rengar',
    'Riven',
    'Rumble',
    'Ryze',
    'Sejuani',
    'Shaco',
    'Shen',
    'Shyvana',
    'Singed',
    'Sion',
    'Sivir',
    'Skarner',
    'Sona',
    'Soraka',
    'Swain',
    'Syndra',
    'TahmKench',
    'Taliyah',
    'Talon',
    'Taric',
    'Teemo',
    'Thresh',
    'Tristana',
    'Trundle',
    'Tryndamere',
    'TwistedFate',
    'Twitch',
    'Udyr',
    'Urgot',
    'Varus',
    'Vayne',
    'Veigar',
    'Velkoz',
    'Vi',
    'Viktor',
    'Vladimir',
    'Volibear',
    'Warwick',
    'Xayah',
    'Xerath',
    'XinZhao',
    'Yasuo',
    'Yorick',
    'Zac',
    'Zed',
    'Ziggs',
    'Zilean',
    'Zoe',
    'Zyra'
  ]
}

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
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

var elem = document.querySelector('.collapsible')
M.Collapsible.init(elem)

var elem = document.querySelector('.modal')
M.Modal.init(elem, {
  onCloseEnd: function() {
    document.getElementById('modalChampImg').src = ''
  }
})

var version

function renderChamps(data, firstRun = false) {
  var str = ''
  for (i = 0; i < data.length; i++) {
    str += `<div class="col s6 m4 l3 hoverable champWrapper" onclick=showChamp("${
      data[i]
    }")>
            <img class="circle champImg" ${
              firstRun ? 'data-' : ''
            }src="https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${
      data[i]
    }.png">
            <p class="flow-text">${data[i]}</p>
        </div>`
  }
  document.querySelector('#list').innerHTML = str
  if (!firstRun) return
  ;[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
    img.setAttribute('src', img.getAttribute('data-src'))
    img.onload = function() {
      img.removeAttribute('data-src')
    }
  })
}

document.getElementById('searchField').addEventListener('keyup', filterData)

function filterData() {
  //Search
  var filter = document.getElementById('searchField').value.toLowerCase()
  var newList = []
  var champs = json.list
  for (i = 0; i < champs.length; i++) {
    if (champs[i].toLowerCase().includes(filter)) {
      newList.push(champs[i])
    }
  }
  renderChamps(newList)
}

//Demo Data
var scripts = [
  {
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

  //DemoData
  //scripts = allScripts[champName]
  document.getElementById('modalChampName').innerHTML = champName
  var img = document.getElementById('modalChampImg')
  img.setAttribute(
    'data-src',
    'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' +
      champName +
      '_0.jpg'
  )

  img.setAttribute('src', img.getAttribute('data-src'))
  img.onload = function() {
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

version = json.version
renderChamps(json.list, true)

/*
loadJSON(
  'data/champs.json',
  function(data) {
    console.log(data)
  },
  function(xhr) {
    console.error(xhr)
  }
)
*/
