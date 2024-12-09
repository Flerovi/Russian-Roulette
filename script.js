addEventListener("DOMContentLoaded", (event) => {
    const game2 = document.getElementById('game2');
    const table = document.getElementById('table');
    const revealTable = document.getElementById('revealTable');
    const revealTableBlurBox = document.getElementById('revealTableBlurBox')
    const startBtn = document.getElementById('startBtn');
    const handYou = document.getElementById('you');
    const handOpp = document.getElementById('opponent');
    const handMaster = document.getElementById('master');
    const gameGun = document.getElementById('gun');
    const gameGunImg = document.getElementById('gunImg');
    const gunHeld = document.getElementById('gunHeld');
    const gunHeldImg = document.getElementById('gunHeldImg');
    const magInsert = document.getElementById('magInsert');
    const magInserted = document.getElementById('magInserted');
    const magRack = document.getElementById('magRack');
    const bullets = document.querySelectorAll('.bullet');
    const handReveal = document.getElementById('handReveal');
    const bulletTable = document.getElementById('bulletTable');
    const bulletRevealTextContainer = document.getElementById('bulletRevealTextContainer');
    const bulletRevealText = document.getElementById('bulletRevealText');
    const gunPointYou = document.getElementById('gunPointYou');
    const gunPointEnemy = document.getElementById('gunPointEnemy');
    const gunPointItselfEnemy = document.getElementById('gunPointItselfEnemy');
    const gunPointItselfYou = document.getElementById('gunPointItselfYou');
    const blurBox = document.getElementById('blurBox');
    const shootBtnOpp = document.getElementById('ShootBtnOpp');
    const shootBtnYou = document.getElementById('ShootBtnYou');
    const gunFire = document.getElementById('gunFire');
    const blackout = document.getElementById('blackout');
    const characterBox = document.getElementById('characterBox');
    const character = document.getElementById('character');
    const characterImg = document.getElementById('characterImg');
    const gunRackDiv = document.getElementById('gunRack');
    const gunRackimg = document.getElementById('gunRackImg');
    const tableTextBox = document.getElementById('tableTextBox');
    const tableText = document.getElementById('tableText');
    const tableTextBox2 = document.getElementById('tableTextBox2');
    let timeOutIds = [];
    let magazine = [];
    let turn = false;
    let ableToClickGun = false;
    let ableToShoot = false;
    let oppHealth = 2;
    let youHealth = 2;
    let revealBulletsCounter = 0;
    let blanksEjected = 0;
    let shotsFired = 0;
    let round = 1;
    
    const RandomintGenerator = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const ammoRatioCalculator = function() {
        revealBulletsCounter++;
        
        if (revealBulletsCounter >= 4) {
            return [4, 4];
        }

        if (RandomintGenerator(1, 100) <= 60) { // 60% chance
            switch (revealBulletsCounter) {
                case 1:
                    return [1, 1];
                case 2:
                    return [2, 2];
                case 3:
                    return [3, 3];
            }
        }

        if (RandomintGenerator(1, 100) <= 50) { //50% chance
            switch (revealBulletsCounter) {
                case 1:
                    return [1, 2];
                case 2:
                    return [2, 3];
                case 3:
                    return [3, 4];
            }
        } else {
            switch (revealBulletsCounter) {
                case 1:
                    return [2, 1];
                case 2:
                    return [3, 2];
                case 3:
                    return [4, 3];
            }
        }
    }

    const bulletStyles = [
        { left: '20%', rotate: '63deg', top: '50%', delay: '0s' },
        { left: '30%', rotate: '-31deg', top: '25%', delay: '50ms' },
        { left: '41%', rotate: '-11deg', top: '65%', delay: '100ms' },
        { left: '34%', rotate: '73deg', top: '42%', delay: '150ms' },
        { left: '45%', rotate: '-26deg', top: '30%', delay: '200ms' },
        { left: '54%', rotate: '-38deg', top: '65%', delay: '250ms' },
        { left: '52%', rotate: '120deg', top: '45%', delay: '300ms' },
        { left: '64%', rotate: '20deg', top: '38%', delay: '400ms' },
    ];
    bullets.forEach((bullet,index) => {
        const {top} = bulletStyles[index];
        bullet.style.top = top;
    })

    startBtn.addEventListener('click', async function() {
        game2.style.left = '0%';
        character.style.transition = 'transform 2000ms ease-out';
        character.style.transform = 'scale(1) translate(0%, 0%)';
        revealBulletsCounter = 0;
        oppHealth = 2;
        youHealth = 2;
        magazine = [];
        turn = true;
        ableToShoot = false;
        ableToClickGun = false;
        blanksEjected = 0;
        shotsFired = 0;
        round = 1;
        updateHealth();

        await delay(1000);
        table.style.transform = 'translateY(0%)';

        await delay(1500);
        revealBullets();
    })

    shootBtnOpp.addEventListener('click', function() {
        if (ableToShoot) {
            ableToShoot = false;
            shootBtnOpp.style.transform = 'translateY(-100%)';
            shootBtnYou.style.transform = 'translateY(100%)';
            shootOpp();
        }
    })

    shootBtnYou.addEventListener('click', function() {
        if (ableToShoot) {
            ableToShoot = false;
            shootBtnOpp.style.transform = 'translateY(-100%)';
            shootBtnYou.style.transform = 'translateY(100%)';
            shootSelfPlayer();
        }
    })

    gunHeld.addEventListener('click', async function() {
        if (ableToClickGun) {
            gunHeldImg.style.transform = 'scale(1) rotate(65deg)';
            gunHeld.style.transform = 'translate(-100%, -100%, 0px)';
            gunHeld.style.cursor = 'default';
            gunPullOut();
            ableToClickGun = false;
            ableToShoot = true;
            tableTextBox2.style.display = 'none';

            await delay(500);
            shootBtnOpp.style.transform = 'translateY(0%)';
            shootBtnYou.style.transform = 'translateY(0%)';
        };
    });
    gunHeld.addEventListener('mouseover', function() {
        if (ableToClickGun) {
            gunHeldImg.style.transform = 'scale(1.1) rotate(65deg)'
            gunHeld.style.transform = 'translate(-100%, -100%, 50px)';
            gunHeld.style.cursor = 'pointer';

            tableTextBox2.style.display = 'flex';
        };
    });
    gunHeld.addEventListener('mouseleave', function() {
        if (ableToClickGun) {
            gunHeldImg.style.transform = 'scale(1) rotate(65deg)'
            gunHeld.style.transform = 'translate(-100%, -100%, 0px)';
            gunHeld.style.cursor = 'default';

            tableTextBox2.style.display = 'none';
        };
    });
    
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const shuffleBullets = function(blanks, live) {
        let TempMagazine = [];

        for (i = blanks; i > 0; i--) {
            TempMagazine.push(false);
        }
        for (i = live; i > 0; i--) {
            TempMagazine.push(true);
        }

        let randomMagazineIndex = RandomintGenerator(0, TempMagazine.length - 1);
        while (TempMagazine.length > 0) {
            magazine.push(TempMagazine[randomMagazineIndex]);
            TempMagazine.splice(randomMagazineIndex, 1);
            randomMagazineIndex = RandomintGenerator(0, TempMagazine.length - 1);
        }
    }

    const revealBulletsText = function(blanks, live) {
        let blankText = "blank";
        let liveText = "round";

        if (blanks > 1) {
            blankText = "blanks";
        };
        if (live > 1) {
            liveText = "rounds";
        };

        bulletRevealText.innerHTML = `
        ${blanks} ${blankText}, ${live} live ${liveText}`;
    }

    const DisplayBullets = function(blanks, live) {
        let array = [];
        const total = blanks + live;

        bullets.forEach(index => {
            index.innerHTML = '';
        });
        for(i = total; i > 0; i--) {
            let randomIndex = RandomintGenerator(0, 7);

            while (array.includes(randomIndex)) {
                randomIndex = RandomintGenerator(0, 7);
            }
            array.push(randomIndex);

            if (blanks > 0) {
                blanks -= 1;
                bullets[randomIndex].innerHTML = `
                <div class="blank">
                    <div class="head"></div>
                    <div class="casing"></div>
                    <div class="casingBottom"></div>
                    <div class="casingPrimer"></div>
                </div>`;
            } else if (live > 0) {
                live -= 1;
                bullets[randomIndex].innerHTML = `
                <div class="live">
                    <div class="head"></div>
                    <div class="casing"></div>
                    <div class="casingBottom"></div>
                    <div class="casingPrimer"></div>
                </div>`;
            };
        }
    }

    const revealBullets = async function() {
        let [blanks, live] = ammoRatioCalculator();
        revealBulletsText(blanks, live);
        shuffleBullets(blanks, live);
        DisplayBullets(blanks, live);

        revealTable.style.left = '0%';
        revealTableBlurBox.style.transform = 'translateX(0%)';

        await delay(500);
        revealTableBlurBox.style.backdropFilter = 'blur(5px)';
        revealTableBlurBox.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        bullets.forEach((bullet,index) => {
            const {left, rotate, delay} = bulletStyles[index];
            bullet.style.left = left;
            bullet.style.transform = `rotate(${rotate})`;
            bullet.style.transitionDelay = delay;
        })

        await delay(500);
        bulletRevealTextContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

        await delay(500);
        bulletRevealText.style.width = '100%';

        await delay(2500);
        bulletRevealText.style.width = '0';

        await delay(500);
        bulletRevealTextContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)';

        await delay(500);
        handReveal.style.left = '50%';
        handReveal.style.transform = 'translate(-50%, -50%) scale(120%) translateZ(5px)';

        await delay(750);
        handReveal.style.transform = 'translate(-50%, -50%) scale(120%) translateZ(0px)';
        masterLoad();

        await delay(500);
        bulletTable.style.transform = "translateX(-100%)";

        await delay(500);
        revealTableBlurBox.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
        revealTableBlurBox.style.backdropFilter = 'blur(0px)';
        revealTable.style.left = '100%';

        await delay(6750);
        revealTableBlurBox.style.transform = 'translateX(100%)'
        turnCheck();
        handReveal.style.left = '0%';
        handReveal.style.transform = 'translate(-105%, -50%) scale(120%) translateZ(5px)';
        bulletTable.style.transform = "translateX(0%)";
        bullets.forEach((bullet) => {
            bullet.style.left = '100%';
            bullet.style.transform = `rotate(0deg)`;
        });
    }

    const masterLoad = async function() {
        await delay(1000);
        handMaster.style.left = '50%';
        handMaster.style.transform = 'translate(-50%, -50%)';
        gunHeldImg.style.transform = 'scaleX(-1)';

        await delay(1200);
        handMaster.style.display = 'none';
        gameGun.style.display = 'none';
        gunHeld.style.display = 'block';
        tableTextBox.style.display = 'flex';

        await delay(200);
        tableTextBox.style.bottom = '0';
        tableTextBox.style.transform = 'translateY(0%)';
        tableTextBox.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        gunHeld.style.left = '0%';
        gunHeld.style.transform = 'translate(0%, -50%)';

        await delay(1100);
        gunHeld.style.display = 'none';
        magInsert.style.display = 'block';

        await delay(200);
        tableText.style.width = "100%";

        await delay(300)
        magInsert.style.display = 'none';
        magInserted.style.display = 'block';

        await delay(750);
        magInserted.style.display = 'none';
        magRack.style.display = 'block';

        await delay(750)
        magRack.style.display = 'none';
        gunHeld.style.display = 'block';

        await delay(750);
        tableText.style.width = "0%";
        gunHeld.style.left = '50%';
        gunHeld.style.transform = 'translate(-50%, -50%)';

        await delay(750)
        tableTextBox.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        gunHeld.style.display = 'none';
        gameGun.style.display = 'block';
        handMaster.style.display = 'block';

        await delay(500)
        tableTextBox.style.display = 'none';
        handMaster.style.left = '0%';
        handMaster.style.transform = 'translate(-100%, -50%)';
    }

    const gunGrab = function() {
        let hand = turn ? handYou : handOpp;

        hand.style.top = '50%';
        hand.style.left = '50%';
        hand.style.transform = 'translate(-50%, -50%)';
        setTimeout(() => {
            hand.style.display = 'none';
            gameGun.style.display = 'none';
            gunHeld.style.display = 'block';
        }, 850)

        if (turn) {
            gunHeldImg.style.transform = 'rotate(65deg)';
            setTimeout(() => {
                gunHeld.style.top = '100%';
                gunHeld.style.left = '105%';
                gunHeld.style.transform = 'translate(-100%, -100%)';
            }, 1350)
            setTimeout(() => {
                ableToClickGun = true;
            }, 2350)
        } else {
            gunHeldImg.style.transform = 'scaleX(-1) rotate(-50deg)';
            setTimeout(() => {
                gunHeld.style.top = '0%';
                gunHeld.style.left = '0%';
                gunHeld.style.transform = 'translate(-0%, -0%)';
            }, 1350)
        }
    }

    const gunGrabReturn = function() {
        let hand = turn ? handYou : handOpp;

        setTimeout(() => {
            gunHeld.style.top = '50%';
            gunHeld.style.left = '50%';
            gunHeld.style.transform = 'translate(-50%, -50%)';
        }, 1000)
        setTimeout(() => {
            hand.style.display = 'block';
            gameGun.style.display = 'block';
            gunHeld.style.display = 'none';
        }, 1850)

        if (turn) {
            setTimeout(() => {
                handYou.style.top = '100%';
                handYou.style.left = '100%';
                handYou.style.transform = 'translate(-100%, -100%)';
            }, 2250)
        } else {
            setTimeout(() => {
                handOpp.style.top = '0%';
                handOpp.style.left = '0%';
                handOpp.style.transform = 'translate(0%, 0%)';
            }, 2250)
        }
    };

    const healthBoardContent = Array.from(document.querySelectorAll('.healthBoardContent'));
    const roundIndicator = Array.from(document.querySelectorAll('.roundIndicator'));
    const healthBoard = document.getElementById('healthBoard');
    const checkHealth = async function() {
        healthBoardContent[0].classList.remove('translate-x-full');
        healthBoardContent[1].classList.add('translate-x-full');
        healthBoardContent[2].classList.add('translate-x-full');
        healthBoard.style.transform = 'translateX(0%)';

        await delay(2500);
        updateHealth();

        if (oppHealth > 0) {
            await delay(1000);
            healthBoard.style.transform = 'translateX(100%)';
            return;
        }
        
        magazine = [];
        revealBulletsCounter = 1;
        roundIndicator.forEach((icon) => {
            icon.querySelectorAll('img').forEach((img) => {
                img.src = 'images/I.svg';
            });
        })
        roundIndicator[2].querySelector('img').src = 'images/skull.svg';

        if (round === 1) {
            round++;
            const firstRoundIcon = roundIndicator[0].querySelector('img');
            const secondRoundIcon = roundIndicator[1].querySelectorAll('img');
            firstRoundIcon.src = 'images/IActive.svg';

            await delay(2000);
            healthBoardContent[0].classList.add('translate-x-full');
            healthBoardContent[1].classList.remove('translate-x-full');

            await delay(2000);
            healthBoardContent[1].classList.add('translate-x-full');
            healthBoardContent[2].classList.remove('translate-x-full');

            await delay(1000);
            firstRoundIcon.src = 'images/I.svg';
            
            await delay(1000);
            secondRoundIcon.forEach((img) => {
                img.src = 'images/IActive.svg';
            });

            await delay(750);
            secondRoundIcon.forEach((img) => {
                img.src = 'images/I.svg';
            });

            await delay(750);
            secondRoundIcon.forEach((img) => {
                img.src = 'images/IActive.svg';
            });

            await delay(750);
            secondRoundIcon.forEach((img) => {
                img.src = 'images/I.svg';
            });

            await delay(750);
            secondRoundIcon.forEach((img) => {
                img.src = 'images/IActive.svg';
            });

            await delay(1000);
            healthBoardContent[2].classList.add('translate-x-full');
            healthBoardContent[0].classList.remove('translate-x-full');

            await delay(1000);
            oppHealth = 4;
            youHealth = 4;
            updateHealth();

            await delay(2000);
            healthBoard.style.transform = 'translateX(100%)';

            await delay(500);
            character.style.transition = 'transform 2000ms ease-out';
            character.style.transform = 'scale(1) translate(0%, 0%)';

            await delay(500);
            table.style.transform = 'translateY(0%)';
            gunPullIn();

            await delay(1000);
            gunGrabReturn();
            revealBullets();

        } else if (round === 2) {
            round++;
            const secondRoundIcon = roundIndicator[1].querySelectorAll('img');
            const thirdRoundIcon = roundIndicator[2].querySelector('img');
            secondRoundIcon.forEach((img) => {
                img.src = 'images/IActive.svg';
            });

            await delay(2000);
            healthBoardContent[0].classList.add('translate-x-full');
            healthBoardContent[1].classList.remove('translate-x-full');

            await delay(2000);
            healthBoardContent[1].classList.add('translate-x-full');
            healthBoardContent[2].classList.remove('translate-x-full');

            await delay(1000);
            secondRoundIcon.forEach((img) => {
                img.src = 'images/I.svg'
            });

            await delay(1000);
            thirdRoundIcon.src = 'images/skullActive.svg';

            await delay(750);
            thirdRoundIcon.src = 'images/skull.svg';

            await delay(750);
            thirdRoundIcon.src = 'images/skullActive.svg';

            await delay(750);
            thirdRoundIcon.src = 'images/skull.svg';

            await delay(750);
            thirdRoundIcon.src = 'images/skullActive.svg';

            await delay(1000);
            healthBoardContent[2].classList.add('translate-x-full');
            healthBoardContent[0].classList.remove('translate-x-full');

            await delay(1000);
            oppHealth = 6;
            youHealth = 6;
            updateHealth();
            
            await delay(2000);
            healthBoard.style.transform = 'translateX(100%)';

            await delay(500);
            character.style.transition = 'transform 2000ms ease-out';
            character.style.transform = 'scale(1) translate(0%, 0%)';

            await delay(500);
            table.style.transform = 'translateY(0%)';
            gunPullIn();

            await delay(1000);
            gunGrabReturn();
            revealBullets();
        } else if (round === 3) {
            const thirdRoundIcon = roundIndicator[2].querySelector('img');
            thirdRoundIcon.src = 'images/skullActive.svg';

            await delay(2000);
            healthBoardContent[0].classList.add('translate-x-full');
            healthBoardContent[1].classList.remove('translate-x-full');

            await delay(2000);
            healthBoardContent[1].classList.add('translate-x-full');
            healthBoardContent[2].classList.remove('translate-x-full');

            await delay(1000);
            thirdRoundIcon.src = 'images/skull.svg';

            await delay(1000);
            healthBoard.style.transform = 'translateX(100%)';

            await delay(5000);
            game2.style.left = '100%';
            gunPullIn();

            await delay(1000);
            gunGrabReturn();
        }
    }

    const updateHealth = function() {
        const healthFunction = function(Player) {
            let HealthDisplayContent = ``;
            for (let i = Player; i > 0; i--) {
                HealthDisplayContent +=                 
                `<div class="healthPoint">
                    <img src="images/health.svg" alt="">
                </div>`;
            }
            return HealthDisplayContent;
        }
        document.getElementById('youHealthDisplay').innerHTML = healthFunction(youHealth);
        document.getElementById('oppHealthDisplay').innerHTML = healthFunction(oppHealth);
    }

    const shootOpp = async function() { //You shoots Opp
        await delay(1000);
        gunPointEnemy.style.top = '50%'; 
        gunPointEnemy.style.transform = 'translate(-50%, -50%)';

        if (magazine[0] === true) {
            await delay(3000);
            displayGunFire(true, '43%', '2', '20rem', '62.5%');
            oppHealth--;
            ejectBullet();
            characterDown();

            await delay(100);
            displayGunFire(false);

            await delay(1400);
            gunPointEnemy.style.top = '100%';
            gunPointEnemy.style.transform = 'translate(-50%, 0%)';

            if (oppHealth <= 0) {
                await delay(2000);
                checkHealth();

            } else {
                await delay(5000);
                checkHealth();

                await delay(4500);
                gunPullIn();

                await delay(1000);
                gunGrabReturn();
                turn = false;
            }
        } else if (magazine[0] === false) {
            await delay(3000);
            gunPointEnemy.style.top = '100%';
            gunPointEnemy.style.transform = 'translate(-50%, 0%)';

            await delay(500);
            gunPullIn();

            await delay(2500);
            gunRack();

            await delay(500);
            gunGrabReturn();
            turn = false;
        }

        if (magazine.length > 0) {
            await delay(2500);
            turnCheck();
        } else {
            await delay(1500);
            revealBullets();
        }
    }

    const shootPlayer = async function() { //Opp shoots You
        await delay(1000);
        gunPointYou.style.top = '-5%';
        gunPointYou.style.transform = 'translate(-50%, -100%)';
        await delay(1000);
        gunPointYou.style.zIndex = '3';
        blurBox.style.opacity = '1';

        if (magazine[0] === true) {
            await delay(3000);
            youHealth--;
            displayGunFire(true, '43%', '4', '22rem', '27%');
            ejectBullet();

            await delay(100);
            displayGunFire(false);
            blackout.style.transform = 'translateY(0%)';
            gunPointYou.style.top = '0%';
            gunPointYou.style.transform = 'translate(-50%, 0%)';
            blurBox.style.opacity = '0';
            gunPointYou.style.zIndex = '0';

            if (youHealth > 0) {
                await delay(1900);
                blackout.style.opacity = '0';

                await delay(1500);
                checkHealth();

                await delay(4500);
                gunPullIn();

                await delay(1000);
                gunGrabReturn();
                blackout.style.transform = 'translateY(100%)';
                blackout.style.opacity = '1';
                turn = true;

                if (magazine.length > 0) {
                    await delay(2500);
                    turnCheck();
                } else {
                    await delay(1500);
                    revealBullets();
                }
            } else {
                game2.style.left = "100%";
                gunPullIn();

                await delay(2000)
                blackout.style.opacity = '0';
                gunGrabReturn();

                await delay(3000);
                blackout.style.transform = 'translateY(100%)';
            }
        } else if (magazine[0] === false) {
            await delay(3000);
            gunPointYou.style.top = '0%';
            gunPointYou.style.transform = 'translate(-50%, 0%)';
            blurBox.style.opacity = '0';
            gunPointYou.style.zIndex = '0';

            await delay(1500);
            gunPullIn();

            await delay(2500);
            gunRack();

            await delay(1000);
            gunGrabReturn();
            turn = true;

            if (magazine.length > 0) {
                await delay(2500);
                turnCheck();
            } else {
                await delay(1500);
                revealBullets();
            }
        }
    }

    const shootSelfPlayer = async function() { //You shoots You
        await delay(1000)
        gunPointItselfYou.style.top = '30%';
        gunPointItselfYou.style.transform = 'translate(-50%, -50%)';
        blurBox.style.opacity = '1';

        await delay(3000)
        if (magazine[0] === true) {
            displayGunFire(true, '55%', '20', '40rem', '50%');
            ejectBullet();
            youHealth--;

            await delay(100)
            blackout.style.transform = 'translateY(0%)';
            displayGunFire(false);
            gunPointItselfYou.style.top = '100%';
            gunPointItselfYou.style.transform = 'translate(-50%, 0%)';
            blurBox.style.opacity = '0';

            if (youHealth > 0) {
                await delay(1900);
                blackout.style.opacity = '0';

                await delay(1500)
                checkHealth();

                await delay(4500);
                gunPullIn();

                await delay(1000);
                gunGrabReturn();
                turn = false;
                blackout.style.transform = 'translateY(100%)';
                blackout.style.opacity = '1';

                if (magazine.length > 0) {
                    await delay(2900);
                    turnCheck();
                } else {
                    await delay(2900)
                    revealBullets();
                }
            } else {
                game2.style.left = "100%";
                gunPullIn();

                await delay(2000)
                blackout.style.opacity = '0';
                gunGrabReturn();

                await delay(3000)
                blackout.style.transform = 'translateY(100%)';
            }
        } else if (magazine[0] === false) {
            gunPointItselfYou.style.top = '100%';
            gunPointItselfYou.style.transform = 'translate(-50%, 0%)';
            blurBox.style.opacity = '0';

            await delay(1000)
            gunPullIn();

            await delay(2000)
            gunRack();

            if (magazine.length > 0) {
                    ableToClickGun = true;
            } else {
                gunGrabReturn();

                await delay(1000)
                revealBullets()
            }
        }
    }

    const shootSelfOpp = async function() { //Opp shoots Opp
        await delay(1000);
        gunPointItselfEnemy.style.top = '-35%';
        gunPointItselfEnemy.style.transform = 'translate(-50%, -100%)';

        if (magazine[0] === true) {
            await delay(3000);
            displayGunFire(true, '34%', '1', '14rem', '39%');
            ejectBullet();
            oppHealth--;
            characterDown();
            gunPointItselfEnemy.style.top = '0%';
            gunPointItselfEnemy.style.transform = 'translate(-50%, 0%)';

            await delay(100);
            displayGunFire(false);

            if (oppHealth <= 0) {
                await delay(3000);
                checkHealth();

            } else {
                await delay(6900);
                checkHealth();

                await delay(4500);
                gunPullIn();

                await delay(1000);
                gunGrabReturn();
                turn = true;
                
                if (oppHealth <= 0) {
                    return;
                };

                if (magazine.length > 0) {
                    await delay(2800);
                    turnCheck();
                } else {
                    await delay(1500);
                    revealBullets();
                }
            }
        } else if (magazine[0] === false) {
            await delay(3500);
            gunPointItselfEnemy.style.top = '0%';
            gunPointItselfEnemy.style.transform = 'translate(-50%, 0%)';

            await delay(1000);
            gunPullIn();

            await delay(2500);
            gunRack();
            if (magazine.length > 0) {
                    turnCheck();
            } else {
                await delay(1500);
                gunGrabReturn();

                await delay(3000);
                revealBullets();
            }
        }
    }

    // const gunShootThem = async function() {
    //     if (turn) {
    //         await delay(1000);
    //         gunPointEnemy.style.top = '50%'; 
    //         gunPointEnemy.style.transform = 'translate(-50%, -50%)';

    //         if (magazine[0] === true) {
    //             await delay(3000);
    //             displayGunFire(true, '43%', '2', '20rem', '62.5%');
    //             oppHealth--;
    //             ejectBullet();
    //             characterDown();

    //             await delay(100);
    //             displayGunFire(false);

    //             await delay(1400);
    //             gunPointEnemy.style.top = '100%';
    //             gunPointEnemy.style.transform = 'translate(-50%, 0%)';

    //             if (oppHealth <= 0) {
    //                 await delay(2000);
    //                 checkHealth();
    //             } else {
    //                 await delay(5000);
    //                 checkHealth();

    //                 await delay(4500);
    //                 gunPullIn();
    
    //                 await delay(1000);
    //                 gunGrabReturn();
    //                 turn = false;
    
    //                 if (magazine.length > 0) {
    //                     await delay(2900)
    //                     turnCheck();
    //                 } else {
    //                     await delay(1500); 
    //                     revealBullets();
    //                 }
    //             }
    //         } else if (magazine[0] === false) {
    //             await delay(3000);
    //             gunPointEnemy.style.top = '100%';
    //             gunPointEnemy.style.transform = 'translate(-50%, 0%)';

    //             await delay(500);
    //             gunPullIn();

    //             await delay(2500);
    //             gunRack();

    //             await delay(500);
    //             gunGrabReturn();
    //             turn = false;

    //             if (magazine.length > 0) {
    //                 await delay(2500);
    //                 turnCheck();
    //             } else {
    //                 await delay(1500);
    //                 revealBullets();
    //             }
    //         }
    //     } else if (!turn) {
    //         await delay(1000);
    //         gunPointYou.style.top = '-5%';
    //         gunPointYou.style.transform = 'translate(-50%, -100%)';
    //         await delay(1000);
    //         gunPointYou.style.zIndex = '3';
    //         blurBox.style.opacity = '1';

    //         if (magazine[0] === true) {
    //             await delay(3000);
    //             youHealth--;
    //             displayGunFire(true, '43%', '4', '22rem', '27%');
    //             ejectBullet();

    //             await delay(100);
    //             displayGunFire(false);
    //             blackout.style.transform = 'translateY(0%)';
    //             gunPointYou.style.top = '0%';
    //             gunPointYou.style.transform = 'translate(-50%, 0%)';
    //             blurBox.style.opacity = '0';
    //             gunPointYou.style.zIndex = '0';

    //             if (youHealth > 0) {
    //                 await delay(1900);
    //                 blackout.style.opacity = '0';
    
    //                 await delay(1500);
    //                 checkHealth();

    //                 await delay(4500);
    //                 gunPullIn();
    
    //                 await delay(1000);
    //                 gunGrabReturn();
    //                 blackout.style.transform = 'translateY(100%)';
    //                 blackout.style.opacity = '1';
    //                 turn = true;
    
    //                 if (magazine.length > 0) {
    //                     await delay(2500);
    //                     turnCheck();
    //                 } else {
    //                     await delay(1500);
    //                     revealBullets();
    //                 }
    //             } else {
    //                 game2.style.left = "100%";
    //                 gunPullIn();

    //                 await delay(2000)
    //                 blackout.style.opacity = '0';
    //                 gunGrabReturn();

    //                 await delay(3000);
    //                 blackout.style.transform = 'translateY(100%)';
    //             }
    //         } else if (magazine[0] === false) {
    //             await delay(3000);
    //             gunPointYou.style.top = '0%';
    //             gunPointYou.style.transform = 'translate(-50%, 0%)';
    //             blurBox.style.opacity = '0';
    //             gunPointYou.style.zIndex = '0';

    //             await delay(1500);
    //             gunPullIn();

    //             await delay(2500);
    //             gunRack();

    //             await delay(1000);
    //             gunGrabReturn();
    //             turn = true;

    //             if (magazine.length > 0) {
    //                 await delay(2500);
    //                 turnCheck();
    //             } else {
    //                 await delay(1500);
    //                 revealBullets();
    //             }
    //         }
    //     }
    // }

    // const gunShootThemself = async function() {
    //     if (turn) {
    //         await delay(1000)
    //         gunPointItselfYou.style.top = '30%';
    //         gunPointItselfYou.style.transform = 'translate(-50%, -50%)';
    //         blurBox.style.opacity = '1';

    //         await delay(3000)
    //         if (magazine[0] === true) {
    //             displayGunFire(true, '55%', '20', '40rem', '50%');
    //             ejectBullet();
    //             youHealth--;

    //             await delay(100)
    //             blackout.style.transform = 'translateY(0%)';
    //             displayGunFire(false);
    //             gunPointItselfYou.style.top = '100%';
    //             gunPointItselfYou.style.transform = 'translate(-50%, 0%)';
    //             blurBox.style.opacity = '0';

    //             if (youHealth > 0) {
    //                 await delay(1900);
    //                 blackout.style.opacity = '0';

    //                 await delay(1500)
    //                 checkHealth();

    //                 await delay(4500);
    //                 gunPullIn();

    //                 await delay(1000);
    //                 gunGrabReturn();
    //                 turn = false;
    //                 blackout.style.transform = 'translateY(100%)';
    //                 blackout.style.opacity = '1';

    //                 if (magazine.length > 0) {
    //                     await delay(2900);
    //                     turnCheck();
    //                 } else {
    //                     await delay(2900)
    //                     revealBullets();
    //                 }
    //             } else {
    //                 game2.style.left = "100%";
    //                 gunPullIn();

    //                 await delay(2000)
    //                 blackout.style.opacity = '0';
    //                 gunGrabReturn();

    //                 await delay(3000)
    //                 blackout.style.transform = 'translateY(100%)';
    //             }
    //         } else if (magazine[0] === false) {
    //             gunPointItselfYou.style.top = '100%';
    //             gunPointItselfYou.style.transform = 'translate(-50%, 0%)';
    //             blurBox.style.opacity = '0';

    //             await delay(1000)
    //             gunPullIn();

    //             await delay(2000)
    //             gunRack();

    //             if (magazine.length > 0) {
    //                     ableToClickGun = true;
    //             } else {
    //                 gunGrabReturn();

    //                 await delay(1000)
    //                 revealBullets()
    //             }
    //         }
    //     } else if (!turn) {
    //         await delay(1000);
    //         gunPointItselfEnemy.style.top = '-35%';
    //         gunPointItselfEnemy.style.transform = 'translate(-50%, -100%)';

    //         if (magazine[0] === true) {
    //             await delay(3000);
    //             displayGunFire(true, '34%', '1', '14rem', '39%');
    //             ejectBullet();
    //             oppHealth--;
    //             characterDown();
    //             gunPointItselfEnemy.style.top = '0%';
    //             gunPointItselfEnemy.style.transform = 'translate(-50%, 0%)';

    //             await delay(100);
    //             displayGunFire(false);

    //             if (oppHealth <= 0) {
    //                 await delay(3000);
    //                 checkHealth();

    //             } else {
    //                 await delay(6900);
    //                 checkHealth();
    
    //                 await delay(4500);
    //                 gunPullIn();
    
    //                 await delay(1000);
    //                 gunGrabReturn();
    //                 turn = true;
                    
    //                 if (oppHealth <= 0) {
    //                     return;
    //                 };
    
    //                 if (magazine.length > 0) {
    //                     await delay(2800);
    //                     turnCheck();
    //                 } else {
    //                     await delay(1500);
    //                     revealBullets();
    //                 }
    //             }
    //         } else if (magazine[0] === false) {
    //             await delay(3500);
    //             gunPointItselfEnemy.style.top = '0%';
    //             gunPointItselfEnemy.style.transform = 'translate(-50%, 0%)';

    //             await delay(1000);
    //             gunPullIn();

    //             await delay(2500);
    //             gunRack();
    //             if (magazine.length > 0) {
    //                     turnCheck();
    //             } else {
    //                 await delay(1500);
    //                 gunGrabReturn();

    //                 await delay(3000);
    //                 revealBullets();
    //             }
    //         }
    //     }
    // }

    const gunPullOut = async function() {
        if (turn) {
            gunHeld.style.transform = 'translate(-100%, 0%)';
        } else {
            gunHeld.style.transform = 'translate(-0%, -100%)';
        }
        await delay(500);
        table.style.transform = 'translateY(100%)';
    }

    const gunPullIn = async function() {
        if (youHealth > 0 && oppHealth > 0) {
            table.style.transform = 'translateY(0%)';
        }
        if (turn) {
            await delay(1000);
            gunHeld.style.transform = 'translate(-100%, -100%)';
        } else {
            await delay(1000);
            gunHeld.style.transform = 'translate(0%, 0%)';
        }
    }
    const turnCheck = async function() {
        gunGrab();
        if (turn) {
            return;
        }

        await delay(3250);
        gunPullOut();

        await delay(750)
        let randomInt = Math.floor(Math.random() * 2);
        if (randomInt === 1) {
            shootSelfOpp();
        } else {
            shootPlayer();
        }
    }
    const displayGunFire = function(bool, top = '0px', index = '1', width = '100px', left = '0') {
        if (bool) {
            gunFire.style.top = top;
            gunFire.style.display = 'block';
            gunFire.style.zIndex = index;
            gunFire.style.width = width;
            gunFire.style.left = left;
        } else {
            gunFire.style.display = 'none';
        }
    }

    const gunRack = async function() {
        gunHeld.style.display = 'none';
        gunRackDiv.style.display = 'block';
        if (turn) {
            gunRackDiv.style.transform = 'translate(-100%, -100%)';
            gunRackDiv.style.top = '105%';
            gunRackDiv.style.left = '100%';
            gunRackimg.style.transform = 'rotate(180deg)';
            ejectBullet();

            await delay(750);
            gunHeld.style.display = 'block';
            gunRackDiv.style.display = 'none';
        } else {
            gunRackDiv.style.transform = 'translate(0%, 0%)';
            gunRackDiv.style.top = '-5%';
            gunRackDiv.style.left = '0%';
            gunRackimg.style.transform = 'rotate(0deg)';
            ejectBullet();

            await delay(750);
            gunHeld.style.display = 'block';
            gunRackDiv.style.display = 'none';
        }
    }

    const bullet = document.getElementById('bullet');
    const ejectBullet = function() {
        clearTimeouts();
        magazine.shift();
        if (turn) {
            bullet.style.display = 'block';
            bullet.style.zIndex = '100';
            bullet.style.opacity = '1';
            bullet.style.transform = 'translate(50%, 50%) rotate(90deg)';
            bullet.style.top = '79%';
            bullet.style.left = '74%';
            timeOutIds.push(setTimeout(() => {
                bullet.style.transform = 'translate(50%, 50%) rotate(-12deg)';
                bullet.style.left = '60%';
                bullet.style.top = '65%';
            }, 5))
        } else {
            bullet.style.display = 'block';
            bullet.style.zIndex = '100';
            bullet.style.opacity = '1';
            bullet.style.transform = 'translate(50%, 50%) rotate(-90deg)';
            bullet.style.top = '17%';
            bullet.style.left = '15%';
            timeOutIds.push(setTimeout(() => {
                bullet.style.transform = 'translate(50%, 50%) rotate(-12deg)';
                bullet.style.left = '35%';
                bullet.style.top = '25%';
            }, 5))
        }
        timeOutIds.push(setTimeout(() => {
            bullet.style.zIndex = '0';
        }, 500))
        timeOutIds.push(setTimeout(() => {
            bullet.style.opacity = '0';
        }, 11000))
        timeOutIds.push(setTimeout(() => {
            bullet.style.display = 'none';
        }, 12100))

        function clearTimeouts() {
            timeOutIds.forEach(id => clearTimeout(id));
            timeOutIds = [];
        }
    }

    const characterDown = async function() {
        character.style.transition = 'transform 500ms ease-in-out';
        character.style.transform = 'scale(0.9)';

        await delay(800);
        character.style.transition = 'transform 1000ms ease-in-out';
        character.style.transform = 'scale(0.9) translate(0%, 100%)';
        if (oppHealth > 0) {
            await delay(3200);
            character.style.transition = 'transform 2000ms ease-out';
            character.style.transform = 'scale(1) translate(0%, 0%)';
        }
    }

});
