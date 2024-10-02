const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionaryapp = document.querySelector('.dictionary-app');

async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json());
return res[0];
    //console.log(res); 
}

btn.addEventListener('click', fetchandCreateCard);
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        btn.click();
    }
});

async function fetchandCreateCard() {
    const data = await dictionaryFn(input.value);
    console.log(data);
    if(data === undefined){
        alert("Please check the word and enter a correct word in the search box")
    }

    let PartsOfspeechArray =[]
    for(let i=0; i<data.meanings.length; i++){
        PartsOfspeechArray.push(data.meanings[i].partOfSpeech);
    }

    var varWord = document.getElementById('word').textContent =data.word;
    document.getElementById('Phonetics').textContent =data.phonetic;
    for(var i=0; i<data.phonetics.length; i++){
    var varAudio = document.getElementById('audio')
    varAudio.src  = data.phonetics[i].audio;
    varAudio.load();
    }

    document.getElementById('definition').textContent =data.meanings[0].definitions[0].definition;
    
    for (let i = 0; i < data.meanings.length; i++) {
        for (let j = 0; j < data.meanings[i].definitions.length; j++) {
            if (data.meanings[i].definitions[j].example) {
                var varExample = document.getElementById('example').textContent =data.meanings[i].definitions[j].example;
            }
        }
    }

    if(PartsOfspeechArray.length == 1){
        document.getElementById('Parts').textContent = data.meanings[0].partOfSpeech;
    }
    else{
    document.getElementById('Parts').textContent =PartsOfspeechArray.map(e=>e).join(',');
    }
    //console.log(varAudio);

    if(varExample ="")   {
        document.getElementById('example').textContent ='NA';
    }
}

