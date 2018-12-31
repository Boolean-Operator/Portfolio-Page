$(document).ready(function() {
$(".menusort").sortable();

var quoteButt = document.querySelector("#quoteButt");
var quote = document.querySelector("#quoteBox");
var author = document.querySelector("#authorBox");

var quotes = [
  {
    Quote:
      "I am free, no matter what rules surround me. If I find them tolerable, I tolerate them; if I find them too obnoxious, I break them. I am free because I know that I alone am morally responsible for everything I do.",
    Author: "- Robert A. Heinlein"
  },{
    Quote:
      "I don't have Talent. I have Tenacity. I have Discipline. I have Focus. And I know, without any illusion, where I come from and where I can go back to.",
    Author: "- Henry Rollins"
  },
  {
    Quote:
      " Knowledge will forever govern ignorance: And a people who mean to be their own Governors, must arm themselves with the power which knowledge gives.",
    Author: "- James Madison, 4th President of The United States of America"
  },
  {
    Quote:
      "As for me, I am tormented with an everlasting itch for things remote. I love to sail forbidden seas, and land on barbarous coasts.",
    Author: - "Herman Melville"
  },
  {
    Quote:
      "The Edge; there is no honest way to explain it, because, the only people who really know where it is are the ones who have gone over.",
    Author: "- Hunter S. Thompson"
  },
  {
    Quote:
      "Live a good life. For, if there are gods and they are just, then they will not care how devout you have been, but will welcome you based on the virtues you have lived by. If there are gods, but unjust, then you should not want to worship them. If there are no gods, then you will be gone, but...will have lived a noble life that will live on in the memories of your loved ones.",
    Author: "- Marcus Aurelius"
  },
  {
    Quote:
      "Everybody is a Genius. But, if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid",
    Author: "- Albert Einstein"
  },
  {
    Quote:
      "The problem, often not discovered until late in life, is that when you look for things in life like love, meaning, motivation, it implies they are sitting behind a tree or under a rock. The most successful people in life recognize, that in life they create their own love, they manufacture their own meaning, they generate their own motivation. For me, I am driven by two main philosophies, know more today about the world than I knew yesterday. And lessen the suffering of others. You\'d be surprised how far that gets you.",
    Author: "- Neil Degrasse Tyson"
  },
  {
    Quote:
      "When a child gives you a gift, even if it is a rock they just picked up, exude gratitude. It may be the only thing they have to give, and they have chosen to give it to you",
    Author: "- Dean Jackson"
  },
  {
    Quote:
      "If you run into an asshole in the morning, you ran into an asshole. If you run into assholes all day, you\'re the asshole.",
    Author: "- Raylan Givens"
  },
  {
    Quote: "What if I told you, steak is better than chicken?",
    Author: "- Morpheus"
  },
  {
    Quote:
      "The best time to plant a tree was twenty years ago. The second best time is now.",
    Author: "- Chinese Proverb"
  },
  {
    Quote: "Everything you want is on the other side of Fear.",
    Author: "- Jake Canfield"
  },
  {
    Quote:
      "Desire is the starting point of all achievement, not hope, not a wish, but a keen pulsating desire which transcends everything.",
    Author: " - Napoleon Hill"
  },
  {
    Quote:
      "Knowing is not enough; We must Apply.  Willing is not enough; We must Do.",
    Author: " - Bruce Lee"
  },
  {
    Quote:
      "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently",
    Author: "- Friedrich Nietzsche"
  },
  {
    Quote:
      "Unless someone like you cares a whole awful lot, nothings is going to get better. It\'s not.",
    Author: "- Dr. Seuss, 'The Lorax'"
  },
  {
    Quote:
      "Great spirits have often encountered violent opposition from mediocre minds.",
    Author: "Albert Einstein"
  },
  {
    Quote:
      "The mediocre mind is incapable of understanding the man who refuses to bow blindly to conventional prejudices and chooses instead to express his opinions courageously and honestly.",
    Author: "Albert Einstein"
  },
  {
    Quote:
      "Teaching should be such that what is offered is perceived as a valuable gift and not as a hard duty.",
    Author: "Albert Einstein"
  },
  {
    Quote:
      "Please pay attention very carefully, because this is the truest thing a stranger will ever say to you: In the face of such hopelessness as our eventual, unavoidable death, there is little sense in not at least TRYING to accomplish all your wildest dreams in life.",
    Author: "Kevin Smith a.k.a. Silent Bob"
  }
];

var usedMax = 6;
var usedNumsArr = [];

quoteButt.addEventListener("click", function() {
  quoteButt.classList.toggle("selected");
  getRandomQuote();
});

function getRandomQuote() {
  var num = Math.floor(Math.random() * quotes.length);

  if (usedNumsArr.length === usedMax) {
    usedNumsArr.shift();
  }

  if (usedNumsArr.includes(num)) {
    return getRandomQuote();
  } else {
    usedNumsArr.push(num);
    quote.textContent = quotes[num].Quote;
    author.textContent = quotes[num].Author;
    console.log(usedNumsArr);
  }
}

getRandomQuote();



var backImages = [
    "blizzard",
    "cloudy-evening",
    "evening-sky",
    "foggy-lake",
    "foggy-mountain",
    "lightning",
    "MillDFreeHeel",
    "rain-blur",
    "rain-umbrella",
    "rainy-window",
    "rolling-hills",
    "sleet",
    "snowfalling",
    "sunny-lake"
  ];

var maxUsed = 4;
var usedImgsArr = [];

function getRandomBG() {
  var num = Math.floor(Math.random() * backImages.length);
  console.log(num);
  if (usedImgsArr.length === maxUsed) {
    usedImgsArr.shift();
  }

  if (usedImgsArr.includes(num)) {
    return getRandomBG();
  } else {
    usedImgsArr.push(num);
    var arrVal = backImages[num];
    console.log(arrVal);
    var imgVal = "url('assets/"+arrVal+".jpg')";
    console.log(imgVal);
    $('body').css("background-image", imgVal);

    }
  }

getRandomBG();

});
