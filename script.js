
const form1 = document.querySelector("form");
const imageContainer = document.querySelector(".image-container");
const cardImageContainer = document.querySelector('.cardImageContainer');

let seachQuery="";
const displayFrom = form1.addEventListener("submit", (e) => {
  e.preventDefault();
  ersaePrevious();
  const val = form1.querySelector("input").value;
  
  seachQuery = val;
  console.log(val);
  movieAPI(val);
});

const movieAPI = async (searchKey) => {
  try {
    const request = await fetch(`https://api.tvmaze.com/search/shows?q=${searchKey}`);
    const Response = await request.json();
    console.log(Response);
    displayImage(Response);

  } catch (err) {
    console.log(err);
    const msg = `oohh sorry there is some error: ${err.message} <br> Try again`;
    const tag = document.createElement("div");
    tag.classList.add(
      "Error-msg",
      "p-3",
      "text-primary-emphasis",
      "bg-primary-subtle",
      "border",
      "border-primary-subtle",
      "rounded-3"
    );
    tag.innerHTML = msg;
    imageContainer.appendChild(tag);
  }
};

let MovieName = "";

const displayImage = (movie) => {
  for (let moveis of movie) {
    const src = moveis.show.image.original;
    const movName = moveis.show.name;
    // MovieName = movName
    const SDetails = moveis.show.summary;
    const slicedSummary = SDetails.slice(0,200) + "  ......";
    const movieLink = moveis.show.officialSite;
    removeBlnkedStartedBG();
    divAndTagsCreations(src,movName,slicedSummary,movieLink);   
  }
  sessionExp(seachQuery).then(()=>{
    alert("Do you want to search new movei ?")
  }).then(()=>{
    const promtKey = prompt("enter the key");
    promtkeyValue = promtKey;
    
  }).then(()=>{
    promotkeyfn(promtkeyValue);
  });
};

const promotkeyfn = (inp) => {
  form1.querySelector('input').value="";
  form1.querySelector('input').value=inp;
}


let promtkeyValue = ""
console.log(promtkeyValue);


const removeBlnkedStartedBG = ()=>{
    const antiqueBG= document.getElementById('main-bg');
    antiqueBG.classList.remove('main-bg')
}



const divAndTagsCreations = (path,titlename,SDetails,link) => {
    const imgCardMain= document.createElement('div');
    imgCardMain.classList.add('col-sm-3', 'mb-3', 'mb-sm-0');
    cardImageContainer.appendChild(imgCardMain);

    const imgCard = document.createElement('div');
    imgCard.classList.add('card');
    imgCardMain.appendChild(imgCard);

    const imgCardSub = document.createElement('div')
    imgCardSub.classList.add('card-body');
    imgCard.appendChild(imgCardSub);

    const img = document.createElement("img");
    img.classList.add('card-image-top','size-img')
    img.src = path;
    imgCardSub.appendChild(img);

    const tName = document.createElement('h5');
    tName.classList.add('card-title','mt-3' , 'mb-2')
    imgCardSub.append(tName);
    tName.innerHTML=titlename;

    const summary = document.createElement('p');
    summary.classList.add('card-text','text-wrap');
    imgCardSub.append(summary);
    summary.innerHTML=SDetails;

    const viewMore = document.createElement('a');
    viewMore.classList.add('btn','btn-primary');
    viewMore.href=link;
    viewMore.setAttribute('target','_blank');
    viewMore.innerText="View More...";
    imgCardSub.append(viewMore);
}

const titleName = () =>{
  const tName = document.createElement('h5');
  tName.classList.add('card-title')

}


const ersaePrevious = () => {
    cardImageContainer.innerHTML = "";
};

const sessionExpMsg = (MovieName) =>{
  return `ohh sorry your movie name : ${MovieName}  
  session has been completed.. 
  please try again...`
}

const sessionExp = (MovieName) => {
  return new Promise((resolve,reject)=>{
    if(imageContainer){
      setTimeout(()=>{
        // resolve(confirm(sessionExpMsg(MovieName),window.location.reload()));
        resolve(confirm(sessionExpMsg(MovieName)))
      },180000);
    }else{
      reject(alert("wrong"));
    }
  })
}

