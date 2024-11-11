addEventListener("DOMContentLoaded", (event) => {
    const startMenu = document.getElementById('startMenu');
    const game2 = document.getElementById('game2');
    const table = document.getElementById('table');
    const revealTable = document.getElementById('revealTable');
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
    const bullet = document.getElementById('bullet');
    const bulletsReveal = document.getElementById('bulletsReveal');
    const tableTextBox = document.getElementById('tableTextBox');
    const tableText = document.getElementById('tableText');
    const tableTextBox2 = document.getElementById('tableTextBox2');
    let timeOutIds = [];
    let magazine = [false];
    let turn = true;
    let ableToClickGun = false;
    let ableToShoot = false;
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

    startBtn.addEventListener('click', function() {
        game2.style.left = '0%';
        setTimeout(() => {
            table.style.transform = 'translateY(0%)';
        }, 1000)
        setTimeout(() => {
            revealBullets(0, 1);
        }, 2500)
    })

    shootBtnOpp.addEventListener('click', function() {
        if (ableToShoot) {
            ableToShoot = false
            shootBtnOpp.style.transform = 'translateY(-100%)'
            shootBtnYou.style.transform = 'translateY(100%)'
        }
        gunShootThem();
    })

    shootBtnYou.addEventListener('click', function() {
        if (ableToShoot) {
            ableToShoot = false
            shootBtnOpp.style.transform = 'translateY(-100%)'
            shootBtnYou.style.transform = 'translateY(100%)'
        }
        gunShootThemself();
    })

    gunHeld.addEventListener('click', function() {
        if (ableToClickGun) {
            gunHeldImg.style.transform = 'scale(1) rotate(65deg)';
            gunHeld.style.transform = 'translate(-100%, -100%, 0px)';
            gunHeld.style.cursor = 'default';
            gunPullOut();
            ableToClickGun = false;
            ableToShoot = true;
            setTimeout(() => {
                shootBtnOpp.style.transform = 'translateY(0%)';
                shootBtnYou.style.transform = 'translateY(0%)';
            }, 1000)

            tableTextBox2.style.display = 'none';
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

    const revealBullets = function(blanks, live) {
        let array2 = [];
        let array = [];
        const total = blanks + live;
        let randomInt = function(num) {
        return Math.floor(Math.random() * num)
        };
        bulletRevealText.innerHTML = `
        ${blanks} blank, ${live} live rounds`;

        for (i = blanks; i > 0; i--) {
            array2.push(false)
        }
        for (i = live; i > 0; i--) {
            array2.push(true)
        }

        let randomIndex2 = randomInt(array2.length);
    
        while (array2.length > 0) {
            magazine.push(array2[randomIndex2])
            array2.splice(randomIndex2, 1)
            randomIndex2 = randomInt(array2.length);
        }

        for(i = total; i > 0; i--) {

            let randomIndex = randomInt(8);

            while (array.includes(randomIndex)) {
                randomIndex = randomInt(8);
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
        revealTable.style.left = '0%';
        setTimeout(() => {
            bulletsReveal.style.backdropFilter = 'blur(5px)';
            bulletsReveal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            bullets.forEach((bullet,index) => {
                const {left, rotate, delay} = bulletStyles[index];
                bullet.style.left = left;
                bullet.style.transform = `rotate(${rotate})`;
                bullet.style.transitionDelay = delay;
            })
        }, 1000)
        setTimeout(() => {
            bulletRevealTextContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        }, 2000)
        setTimeout(() => {
            bulletRevealText.style.width = '100%';
        }, 2250)
        setTimeout(() => {
            bulletRevealText.style.width = '0';
        }, 5000)
        setTimeout(() => {
            bulletRevealTextContainer.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        }, 5750)
        setTimeout(() => {
            handReveal.style.left = '50%';
        }, 6000)
        setTimeout(() => {
            handReveal.style.transform = 'translate(-50%, -50%) scale(120%) translateZ(0px)';
        }, 7000)
        setTimeout(() => {
            bulletTable.style.left = "-100%";
            bulletsReveal.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
            bulletsReveal.style.backdropFilter = 'blur(0px)';
        }, 7750)
        setTimeout(() => {
            revealTable.style.left = '100%';
            masterLoad();
        }, 9000)
        setTimeout(() => {
            turnCheck()
        }, 20000)
        // setTimeout(() => {
        //     bulletTable.style.left = "0%";
        // }, 10000)
    }

    const masterLoad = function() {
        setTimeout(() => {
            handMaster.style.left = '50%';
            handMaster.style.transform = 'translate(-50%, -50%)'
            gunHeldImg.style.transform = 'scaleX(-1)';
        }, 1000);
        setTimeout(() => {
            handMaster.style.display = 'none';
            gameGun.style.display = 'none';
            gunHeld.style.display = 'block';
            tableTextBox.style.display = 'flex';
        }, 2200);
        setTimeout(() => {
            tableTextBox.style.bottom = '0';
            tableTextBox.style.transform = 'translateY(0%)';
            tableTextBox.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            gunHeld.style.left = '0%';
            gunHeld.style.transform = 'translate(0%, -50%)';
        }, 2700);
        setTimeout(() => {
            tableText.style.width = "100%";
        }, 3700)
        setTimeout(() => {
            gunHeld.style.display = 'none';
            magInsert.style.display = 'block';
        }, 4700)
        setTimeout(() => {
            magInsert.style.display = 'none';
            magInserted.style.display = 'block';
        }, 5700)
        setTimeout(() => {
            magInserted.style.display = 'none';
            magRack.style.display = 'block';
        }, 6700)
        setTimeout(() => {
            magRack.style.display = 'none';
            gunHeld.style.display = 'block';
        }, 7700)
        setTimeout(() => {
            tableText.style.width = "0%";
            gunHeld.style.left = '50%';
            gunHeld.style.transform = 'translate(-50%, -50%)'
        }, 8700)
        setTimeout(() => {
            tableTextBox.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            gunHeld.style.display = 'none';
            gameGun.style.display = 'block';
            handMaster.style.display = 'block';
        }, 9700)
        setTimeout(() => {
            tableTextBox.style.display = 'none';
            handMaster.style.left = '0%';
            handMaster.style.transform = 'translate(-100%, -50%)'
        }, 10200)
    }

    const gunGrab = function() {
        if (turn) {
            gunHeldImg.style.transform = 'rotate(65deg)';
            setTimeout(() => {
                handYou.style.top = '50%';
                handYou.style.left = '50%';
                handYou.style.transform = 'translate(-50%, -50%)';
            }, 1000)
            setTimeout(() => {
                handYou.style.display = 'none';
                gameGun.style.display = 'none';
                gunHeld.style.display = 'block';
            }, 2200)
            setTimeout(() => {
                gunHeld.style.top = '100%';
                gunHeld.style.left = '105%';
                gunHeld.style.transform = 'translate(-100%, -100%)';
            }, 2700)
            setTimeout(() => {
                ableToClickGun = true;
                console.log("you can click gun")
            }, 3700)
        } else {
            gunHeldImg.style.transform = 'scaleX(-1) rotate(-50deg)';
            setTimeout(() => {
                handOpp.style.top = '50%';
                handOpp.style.left = '50%';
                handOpp.style.transform = 'translate(-50%, -50%)';
            }, 1000)
            setTimeout(() => {
                handOpp.style.display = 'none';
                gameGun.style.display = 'none';
                gunHeld.style.display = 'block';
            }, 2200)
            setTimeout(() => {
                gunHeld.style.top = '0%';
                gunHeld.style.left = '0%';
                gunHeld.style.transform = 'translate(-0%, -0%)';
            }, 2700)
        }
    }

    const gunGrabReturn = function() {
        if (turn) {
            setTimeout(() => {
                gunHeld.style.top = '50%';
                gunHeld.style.left = '50%';
                gunHeld.style.transform = 'translate(-50%, -50%)';
            }, 1000)
            setTimeout(() => {
                handYou.style.display = 'block';
                gameGun.style.display = 'block';
                gunHeld.style.display = 'none';
            }, 2200)
            setTimeout(() => {
                handYou.style.top = '100%';
                handYou.style.left = '100%';
                handYou.style.transform = 'translate(-100%, -100%)';
            }, 2700)
        } else {
            setTimeout(() => {
                gunHeld.style.top = '50%';
                gunHeld.style.left = '50%';
                gunHeld.style.transform = 'translate(-50%, -50%)';
            }, 1000)
            setTimeout(() => {
                handOpp.style.display = 'block';
                gameGun.style.display = 'block';
                gunHeld.style.display = 'none';
            }, 2200)
            setTimeout(() => {
                handOpp.style.top = '0%';
                handOpp.style.left = '0%';
                handOpp.style.transform = 'translate(0%, 0%)';
            }, 2700)
        }
    };
    
    const gunShootThem = function() {
        if (turn) {
            setTimeout(() => {
                gunPointEnemy.style.top = '50%';
                gunPointEnemy.style.transform = 'translate(-50%, -50%)';
                if (magazine[0] === true) {
                    setTimeout(() => {
                        displayGunFire(true, '43%', '2', '20rem', '62.5%');
                        ejectBullet();
                        characterDown();
                    }, 4000)
                    setTimeout(() => {
                        displayGunFire(false);
                        // character.style.transform = 'translateY(100%)'
                    }, 4100)
                    setTimeout(() => {
                        gunPointEnemy.style.top = '100%';
                        gunPointEnemy.style.transform = 'translate(-50%, 0%)';
                    }, 5500)
                    setTimeout(() => {
                        table.style.transform = 'translateY(0%)';
                        gunPullIn()
                    }, 11000)
                    setTimeout(() => {
                        gunGrabReturn()
                    }, 12000)
                    setTimeout(() => {
                        turn = false;
                    }, 14900)
                    setTimeout(() => {
                        turnCheck()
                    }, 15000)
                } else {
                    setTimeout(() => {
                        gunPointEnemy.style.top = '100%';
                        gunPointEnemy.style.transform = 'translate(-50%, 0%)';
                    }, 4000)
                    setTimeout(() => {
                        table.style.transform = 'translateY(0%)'
                        gunPullIn();
                    }, 5000)
                    setTimeout(() => {
                        gunRack();
                    }, 7500)
                    setTimeout(() => {
                        gunGrabReturn()
                    }, 8500)
                    setTimeout(() => {
                        turn = false;
                        turnCheck()
                    }, 11000)
                }
            }, 1000)
        } else {
            setTimeout(() => {
                gunPointYou.style.top = '-5%';
                gunPointYou.style.transform = 'translate(-50%, -100%)';
            }, 1000)
            setTimeout(() => {
                gunPointYou.style.zIndex = '3';
                blurBox.style.opacity = '1';
            }, 2000)
            if (magazine[0] === true) {
                setTimeout(() => {
                    displayGunFire(true, '43%', '4', '22rem', '27%');
                    ejectBullet();
                }, 5000)
                setTimeout(() => {
                    displayGunFire(false);
                    blackout.style.transform = 'translateY(0%)';
                    gunPointYou.style.top = '0%';
                    gunPointYou.style.transform = 'translate(-50%, 0%)';
                    blurBox.style.opacity = '0';
                    gunPointYou.style.zIndex = '0';
                }, 5100)
                setTimeout(() => {
                    blackout.style.opacity = '0';
                }, 7000)
                setTimeout(() => {
                    gunPullIn();
                }, 8500)
                setTimeout(() => {
                    gunGrabReturn();
                    blackout.style.transform = 'translateY(100%)';
                    blackout.style.opacity = '1';
                }, 9500)
                setTimeout(() => {
                    turn = true;
                    turnCheck();
                }, 12000)
            } else {
                setTimeout(() => {
                    gunPointYou.style.top = '0%';
                    gunPointYou.style.transform = 'translate(-50%, 0%)';
                    blurBox.style.opacity = '0';
                    gunPointYou.style.zIndex = '0';
                }, 5500)
                setTimeout(() => {
                    gunPullIn();
                }, 7000)
                setTimeout(() => {
                    gunRack();
                }, 9500)
                setTimeout(() => {
                    gunGrabReturn();
                }, 10500)
                setTimeout(() => {
                    turn = true;
                    turnCheck();
                }, 13000 )
            }
        }
    }
    const gunShootThemself = function() {
        if (turn) {
            setTimeout(() => {
                gunPointItselfYou.style.top = '30%';
                gunPointItselfYou.style.transform = 'translate(-50%, -50%)';
                blurBox.style.opacity = '1';
            }, 1000)
            setTimeout(() => {
                if (magazine[0] === true) {
                    ejectBullet();
                    displayGunFire(true, '55%', '20', '40rem', '50%');
                    setTimeout(() => {
                        blackout.style.transform = 'translateY(0%)';
                        displayGunFire(false);
                        gunPointItselfYou.style.top = '100%';
                        gunPointItselfYou.style.transform = 'translate(-50%, 0%)';
                        blurBox.style.opacity = '0'
                    }, 100)
                    setTimeout(() => {
                        blackout.style.opacity = '0';
                    }, 2000)
                    setTimeout(() => {
                        gunPullIn();
                    }, 4000)
                    setTimeout(() => {
                        gunGrabReturn();
                        turn = false;
                        blackout.style.transform = 'translateY(100%)';
                        blackout.style.opacity = '1';
                    }, 5000)
                    if (magazine.length > 0) {
                        setTimeout(() => {
                            turnCheck();
                        }, 7900)
                    } else {
                        setTimeout(() => {
                            revealBullets(4, 4);
                        }, 7900)
                    }
                } else {
                    gunPointItselfYou.style.top = '100%';
                    gunPointItselfYou.style.transform = 'translate(-50%, 0%)';
                    blurBox.style.opacity = '0';
                    setTimeout(() => {
                        gunPullIn();
                    }, 1000)
                    setTimeout(() => {
                        gunRack();
                        if (magazine.length > 0) {
                                ableToClickGun = true;
                        } else {
                            setTimeout(() => {
                                gunGrabReturn();
                            }, 1000)
                            setTimeout(() => {
                                revealBullets(4, 4)
                            }, 2500)
                        }
                    }, 3500)
                }
            }, 5000)
        } else {
            setTimeout(() => {
                gunPointItselfEnemy.style.top = '-35%';
                gunPointItselfEnemy.style.transform = 'translate(-50%, -100%)'
            }, 1000)
            if (magazine[0] === true) {
                setTimeout(() => {
                    displayGunFire(true, '32%', '1', '14rem', '39%');
                    ejectBullet();
                    characterDown();
                    gunPointItselfEnemy.style.top = '0%';
                    gunPointItselfEnemy.style.transform = 'translate(-50%, 0%)'
                }, 5000)
                setTimeout(() => {
                    displayGunFire(false)
                }, 5100)
                setTimeout(() => {
                    gunPullIn();
                }, 12000)
                setTimeout(() => {
                    gunGrabReturn();
                }, 13000)
                setTimeout(() => {
                    turn = true;
                }, 15800)
                setTimeout(() => {
                    turnCheck();
                }, 15900)
            } else {
                setTimeout(() => {
                    gunPointItselfEnemy.style.top = '0%';
                    gunPointItselfEnemy.style.transform = 'translate(-50%, 0%)'
                }, 5500)
                setTimeout(() => {
                    gunPullIn();
                }, 6500)
                setTimeout(() => {
                    gunRack();
                    turnCheck();
                }, 9000)
            }
        }
    }
    const gunPullOut = function() {
        if (turn) {
            gunHeld.style.transform = 'translate(-100%, 0%)';
        } else {
            gunHeld.style.transform = 'translate(-0%, -100%)';
        }
        setTimeout(() => {
            table.style.transform = 'translateY(100%)'
        },500)
    }
    const gunPullIn = function() {
        table.style.transform = 'translateY(0%)';
        if (turn) {
            setTimeout(() => {
                gunHeld.style.transform = 'translate(-100%, -100%)';
            }, 1000)
        } else {
            setTimeout(() => {
                gunHeld.style.transform = 'translate(0%, 0%)';
            }, 1000)
        }
    }
    const turnCheck = function() {
        gunGrab();
        if (!turn) {
            setTimeout(() => {
                gunPullOut();
            }, 3750)
            setTimeout(() => {
                let randomInt = Math.floor(Math.random() * 2);
                if (randomInt === 1) {
                    gunShootThemself();
                } else {
                    gunShootThem();
                }
            }, 5500)
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

    const gunRack = function() {
        gunHeld.style.display = 'none';
        gunRackDiv.style.display = 'block';
        if (turn) {
            gunRackDiv.style.transform = 'translate(-100%, -100%)';
            gunRackDiv.style.top = '105%';
            gunRackDiv.style.left = '100%';
            gunRackimg.style.transform = 'rotate(180deg)';
            ejectBullet();
            setTimeout(() => {
                gunHeld.style.display = 'block';
                gunRackDiv.style.display = 'none';
            }, 1000)
        } else {
            gunRackDiv.style.transform = 'translate(0%, 0%)';
            gunRackDiv.style.top = '-5%';
            gunRackDiv.style.left = '0%';
            gunRackimg.style.transform = 'rotate(0deg)';
            ejectBullet();
            setTimeout(() => {
                gunHeld.style.display = 'block';
                gunRackDiv.style.display = 'none';
            }, 1000)
        }
    }

    const ejectBullet = function() {
        clearTimeouts();
        magazine.shift();
        console.log(magazine);
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
            }, 1))
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
            }, 1))
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

    const characterDown = function() {
        character.style.transition = 'transform 500ms ease-in-out';
        character.style.transform = 'scale(0.9)';
        setTimeout(() => {
            character.style.transition = 'transform 1000ms ease-in-out';
            character.style.transform = 'scale(0.9) translate(0%, 100%)';
        }, 800)
        setTimeout(() => {
            character.style.transition = 'transform 2000ms ease-out';
            character.style.transform = 'scale(1) translate(0%, 0%)';
        }, 4000)
    }

    game2.style.left = '0%';
    table.style.transform = 'translateY(0%)';
    gunGrab();
});