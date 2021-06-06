const main = document.getElementById('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
  {
    image:
      'https://image.freepik.com/free-photo/copy-space-man-celebrating_23-2148467190.jpg',
    text: "I'm Happy",
  },

  {
    image:
      'https://image.freepik.com/free-photo/sad-businessman-sitting-head-hands-bed-dark-bedroom_41418-7.jpg',
    text: "I'm Sad",
  },
  {
    image:
      'https://image.freepik.com/free-photo/confused-young-woman-sitting-kitchen-home_171337-4138.jpg',
    text: "I'm Hungry",
  },
  {
    image:
      'https://image.freepik.com/free-photo/young-man-bored-work_23-2147650328.jpg',
    text: "I'm Bored",
  },
  {
    image:
      'https://i.insider.com/5633d74cdd08952d1e8b4603?width=1136&format=jpeg',
    text: "I'm Scared",
  },
  {
    image:
      'https://www.psychologicalscience.org/redesign/wp-content/uploads/2014/06/GettyImages-172586047-609x419.jpg',
    text: "I'm Angry",
  },
  {
    image:
      'https://www.straitstimes.com/sites/default/files/styles/article_pictrure_780x520_/public/articles/2014/12/27/ST_20141227_SPTINSPIRE2_12542e_2x.jpg?itok=rSQXE7ai&timestamp=1435132433',
    text: 'I want to watch Football',
  },
  {
    image:
      'https://allafrica.com/download/pic/main/main/csiid/00540288:0108525206065aac7d449a5eca3cf510:arc614x376:w1200.jpg',
    text: 'I want to watch Big Brother',
  },
  {
    image:
      'https://www.click2houston.com/resizer/KdEUN0w-7kIEYeQ_1z2wWFoqK6M=/1600x1066/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/cloudfront-us-east-1.images.arcpublishing.com/gmg/VUVBR2Z3OBG3LF6JAG7RMAGZIE.jpg',
    text: 'I want to go to School',
  },
  {
    image: 'https://images.hdqwalls.com/wallpapers/fifa-21-game-1o.jpg',
    text: 'I want to play Game',
  },
  {
    image:
      'https://www.gannett-cdn.com/-mm-/572b68859e7a20b5aec9cd2b5c79fcaf9701ec24/c=0-212-5231-3168/local/-/media/2016/06/14/Phoenix/Phoenix/636015211841993836-CI-05479r.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp',
    text: 'I want to watch a Movie',
  },
  {
    image:
      'https://img.freepik.com/free-photo/young-guy-sleeping-bed-wearing-smartwatch-sleep-tracker_1163-5232.jpg?size=626&ext=jpg&ga=GA1.2.197676575.1579808287',
    text: 'I want to sleep',
  },
];

data.forEach(createBox);

function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
        <img src = "${image}" alt = "${text}" />
        <p class ="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

const message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function setVoice({ target }) {
  message.voice = voices.find((voice) => voice.name === target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);

toggleBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.toggle('show');
});

closeBtn.addEventListener('click', () => {
  document.getElementById('text-box').classList.remove('show');
});

voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();
