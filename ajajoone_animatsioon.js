// See kood on pärit videost: https://youtu.be/VvSVw1yLAPM?si=kp9mn5Ehzv3fp1pV.

// 1. Valime konteineri, mille sees slaidid asuvad, ja kõik "slaidid", mis sisaldavad sisu, mida liigelda.
// container on kogu sisu konteiner.
const container = document.querySelector(".container");
// sections - kõik elemendid, mille klassiks on 'slaid', töödeldakse GSAP utiliidiga toArray.
const sections = gsap.utils.toArray(".slaid");
// texts - kõik elemendid, millel on klass 'anim', mida hiljem animatsiooniga mõjutada.
const texts = gsap.utils.toArray(".anim");
// mask on element, mis on ilmselt mõeldud progressi indikaatoriks.
const mask = document.querySelector(".mask");

// 2. Loome liikumisanimatsiooni kõikidele sektsioonidele.
let scrollTween = gsap.to(sections, {
  // xPercent määrab iga sektsiooni liikumise horisontaalselt vasakule.
  xPercent: (-100 * (sections.length - 1)),  // liikumisprotsent määratakse sektsioonide arvu järgi
  ease: "none", // Ei kasuta sujuvat üleminekut, liikumine on lineaarne.
  scrollTrigger: {
    trigger: ".container",  // ScrollTriggeri käivitamiseks kasutan konteinerit, mis sisaldab slaide.
    pin: true,  // "Pin" tähendab, et konteiner jääb kerimise ajal paigale.
    scrub: 1,  // Scrub tähendab, et kerimise ajal sisu liigub kooskõlas kerimisega (sujuvalt).
    end: "+=3000",  // Kui palju ekraanil kerida saab enne, kui liikumine lõpeb. Kasutame 3000px.
    /*markers: true,*/ // Märgiste abil saab visuaalselt jälgida animatsiooni liikumist.
  }
});

// 3. Konsolideerime logi, et teada saada, kui palju sektsioone on ja arvutada liikumisprotsent (peidetud)
/*console.log(1 / (sections.length - 1));*/

// 4. Progressi animatsioon: mask muutub laiemaks, et visualiseerida kerimise edenemist.
gsap.to(mask, {
  width: "100%",  // Maski laius muutub 100%-ks, et anda visuaalne signaal edusammudest.
  scrollTrigger: {
    trigger: ".wrapper",  // Käivitatakse wrapperi elemendi järgi.
    start: "top left",  // Animatsioon algab, kui wrapperi ülemine vasak nurk jõuab ekraani vasakusse ülemisse nurka.
    scrub: 1  // Scrub tähistab, et animatsioon liigutatakse kooskõlas kerimisega.
  }
});

// 5. Läbime kõik sektsioonid ja anname neile animatsioonid.
sections.forEach((section) => {
  // Etsime iga sektsiooni sees asuvaid 'anim' klassiga elemente.
  let text = section.querySelectorAll(".anim");
  
  // Kui pole 'anim' klassiga elemente, siis jätame sektsiooni välja.
  if(text.length === 0)  return;
  
  // 6. Kõikide 'anim' elementide animatsioon, mis liiguvad ja muudavad läbipaistvust.
  gsap.from(text, {
    y: -130,  // Element liigub algselt -130px (ülespoole).
    opacity: 0,  // Alguses on element täiesti läbipaistmatu.
    duration: 2,  // Animatsiooni kestus on 2 sekundit.
    ease: "elastic",  // Kasutame "elastic" liikumisefekti, et anda animatsioonile elastne liikumine.
    stagger: 0.1,  // Kasutame "stagger", et elemente ilmuks järjestikku väikeste viivitustega (0.1 sekundi).
    scrollTrigger: {
      trigger: section,  // Iga sektsiooni käivitab selle enda kerimine.
      containerAnimation: scrollTween,  // Liikumine on seotud scrollTween animaatoriga, et kerimine ja liikumine oleksid sünkroonis.
      start: "left center",  // Animatsioon algab, kui sektsiooni vasak külg jõuab ekraani keskele.
      /*markers: true*/ // Märgid visuaalseks jälgimiseks (peidetud).
    }
  });
});