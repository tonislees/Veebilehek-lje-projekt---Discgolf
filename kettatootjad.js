// See kood on pärit videost: https://www.youtube.com/watch?v=hBbrGFCszU4&ab_channel=QuickCodingTuts
// ning seda on kohandatud ja täiendatud ülejäänuga vastavaks.

document.addEventListener('DOMContentLoaded', () => {  // Ootab, et terve leht oleks laetud
    // Leiab dropdown-menüü klassiga div elemendi
    const dropdownid = document.querySelectorAll('.dropdown-menüü');

    // Leiab vajalikud div elemendid vastavate klasside järgi
    dropdownid.forEach(dropdown => {
        const valik = dropdown.querySelector('.valik');
        const valitu = dropdown.querySelector('.valitu');
        const nool = dropdown.querySelector('.nool');
        const menüü = dropdown.querySelector('.menüü');
        const valikud = dropdown.querySelectorAll('.menüü li');
        const sisu = document.querySelectorAll('.menüü-valik');

        // Ootab hiireklikki valikuribal
        valik.addEventListener('click', () => {
            // Avab dropdown menüü
            valik.classList.toggle('valik-vajutus');
            nool.classList.toggle('nool-pööratud');
            menüü.classList.toggle('menüü-lahti');
        });

        // Ootab hiireklikki menüüs
        valikud.forEach(valik => {
            valik.addEventListener('click', () => {
                // Võtab valitud riba data-target ID
                const sihtId = valik.getAttribute('data-target');
                // Muudab valikuriba teksti valitud tekstiks
                valitu.innerText = valik.innerText;

                // Paneb kõik menüü valikud kinni, et eelmine valik kinni läheks
                sisu.forEach(s => {
                    s.classList.remove('avatud');
                });

                // Avab ainult valitud sisu
                const sihtSisu = document.getElementById(sihtId);
                if (sihtSisu) {
                    sihtSisu.classList.add('avatud');
                };

                // Paneb dropdownmenüü kinni
                valik.classList.remove('valik-vajutus');
                nool.classList.remove('nool-pööratud');
                menüü.classList.remove('menüü-lahti');

                // Muudab eelmise valiku mitteaktiivseks
                valikud.forEach(valik => {
                    valik.classList.remove('aktiivne');
                });

                // Muudab uue valiku aktiivseks
                valik.classList.add('aktiivne');
            });
        });
    });
});