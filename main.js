// toto budeš potřebovat později
/*
if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
	// panacek a mince se prekryvaji
}
*/


// sem začni psát svůj program

//nadefinujeme globální proměnné, ty jsou pak použitelné kdekoliv v programu

let panacek, panacekX, panacekY, panacekSirka, panacekVyska;
let mince, minceX, minceY, minceSirka, minceVyska;
let score, pocetMinci;
let zvukMince, zvukFanfara;
let hrajeHudba = false;


// tato funkce se spustí při načtení stránky, tj. ve chvíli, kdy je načtené komplet HTML, CSS a všechny obrázky a zvuky

function priNacteniStranky() {

	// do globálních proměnných si uložíme odkaz na objekty panáčka a mince, abychom je nemuseli při každém použití znovu na stránce hledat pomocí document.querySelector

	panacek = document.getElementById('panacek');
	mince = document.getElementById('mince');

	//proměnné score a zvuky
	score = document.getElementById('score');
	zvukMince = document.getElementById('zvukmince');
	zvukFanfara = document.getElementById('zvukfanfara');

	//nastavíme výchozí hodnotu pro score

	pocetMinci = 0;

	// zjistíme šířku a výšku panáčka

	panacekSirka = panacek.width;
	panacekVyska = panacek.height;


	// a umístíme panáčka do středu okna
	panacekX = Math.round(window.innerWidth / 2 - panacekSirka / 2);
	panacekY = Math.round(window.innerHeight / 2 - panacekVyska / 2);


	// umístíme panáčka na startovní pozici

	umistiPanacka();

	// zjistíme šířku a výšku mince

	minceSirka = mince.width;
	minceVyska = mince.height;


	// a vygenerujeme první minci na náhodné pozici

	novaMince();

}

// funkce, která umístí panáčka na jeho souřadnice
// tj. nastaví jeho style.left a style.top na hodnoty panacekX, panacekY
function umistiPanacka() {
	panacek.style.left = panacekX + 'px';
	panacek.style.top = panacekY + 'px';
}

// funkce pro nahodné vygenerování nové pozice mince
// a umístění mince na tyto souřadnice
function novaMince() {
	minceX = Math.round(Math.random() * (window.innerWidth - minceSirka));
	minceY = Math.round(Math.random() * (window.innerHeight - minceVyska));
	mince.style.left = minceX + 'px';
	mince.style.top = minceY + 'px';
}

// tato funkce se zavolá při stisku klávesy
// do proměnné "udalost" se vloží objekt s parametry události¨
// kde lze najít např. i vlastnost "key",
// která obsahuje znak stisknuté klávesy
function priStiskuKlavesy(udalost) {

	//zapneme hudbu
	if (!hrajeHudba) {
		document.getElementById('hudba').play();
		console.log('Zapínám hudbu...');
		hrajeHudba = true;
	}
	
	// šipka vlevo
	if (udalost.key === 'ArrowLeft') {
		panacekX -= 10;
		if (panacekX < 0) {
			panacekX = 0;
		}
		panacek.src = 'obrazky/panacek-vlevo.png';
	}

	// šipka vpravo
	if (udalost.key === 'ArrowRight') {
		panacekX += 10;
		if (panacekX + panacekSirka > window.innerWidth) {
			panacekX = window.innerWidth - panacekSirka;
		}
		panacek.src = 'obrazky/panacek-vpravo.png';
	}

	// šipka nahoru
	if (udalost.key === 'ArrowUp') {
		panacekY -= 10;
		if (panacekY < 0) {
			panacekY = 0;
		}
		panacek.src = 'obrazky/panacek-nahoru.png';
	}

	// šipka dolů
	if (udalost.key === 'ArrowDown') {
		panacekY += 10;
		if (panacekY + panacekSirka > window.innerWidth) {
			panacekY = window.innerWidth - panacekSirka;
		}
		panacek.src = 'obrazky/panacek.png';
	}

	// panáčka umistíme na nově vypočítanou pozici
	umistiPanacka();

	// otestujeme kolizi panáčka s mincí
	otestujKolizi();

}

// funkce pro otestování kolize panáčka s mincí
function otestujKolizi() {
	if (!(panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
		zvukMince.play();
		zvysScore();
		novaMince();
	}
} 

// funkce pro zvýšení skóre

function zvysScore() {
	// zvýšíme skóre o 1 (inkrementace)
	pocetMinci++;

	// vypíšeme skóre
	score.innerText = pocetMinci;

	// otestujeme dosažení 5 bodů
	if (pocetMinci === 5) {
		zvukFanfara.play();

		// zobrazíme vítěznou hlášku
		alert('Hurá! Vyhrála jsi!');
	}
}