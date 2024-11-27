// Selle koodi kirjutas Tõnis Lees

document.addEventListener('DOMContentLoaded', () => {
    const dropdownid = document.querySelectorAll('.dropdown-menüü');

    dropdownid.forEach(dropdown => {
        const valik = dropdown.querySelector('.valik');
        const valitu = dropdown.querySelector('.valitu');
        const nool = dropdown.querySelector('.nool');
        const menüü = dropdown.querySelector('.menüü');
        const valikud = dropdown.querySelectorAll('.menüü li');
        const sisu = document.querySelectorAll('.menüü-valik');

        valik.addEventListener('click', () => {
            valik.classList.toggle('valik-vajutus');
            nool.classList.toggle('nool-pööratud');
            menüü.classList.toggle('menüü-lahti');
        });

        valikud.forEach(valik => {
            valik.addEventListener('click', () => {
                const sihtId = valik.getAttribute('data-target');
                console.log(sihtId)
                valitu.innerText = valik.innerText;

                sisu.forEach(s => {
                    s.classList.remove('avatud');
                });

                const sihtSisu = document.getElementById(sihtId);
                if (sihtSisu) {
                    sihtSisu.classList.add('avatud');
                };

                valik.classList.remove('valik-vajutus');
                nool.classList.remove('nool-pööratud');
                menüü.classList.remove('menüü-lahti');

                valikud.forEach(valik => {
                    valik.classList.remove('aktiivne');
                });
                valik.classList.add('aktiivne');
            });
        });
    });
});