const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
document.querySelector('.background').style.animation = "none";
let isJumping = false;
let position = 0;
let pontos = 0;
let gameOver = false;

function start() {
    
    document.querySelector('.background').style.animation = "slideRight 600s infinite linear";
    document.querySelector('.inicio').remove();

        //Aciona barra de espaço
        function handleKeyDown(event) {
            if (event.keyCode === 32) {
                if (!isJumping) {
                    jump();
                    pontos += 10;
                }
            }
        }
        
        //Configura Pulo
        function jump() {
            
            isJumping = true;
            
            let upInterval = setInterval(() => {
                if (position >= 200) {
                    clearInterval(upInterval);
                    
                //Descendo
                let downInterval = setInterval(() => {
                    
                    if (position <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    } else {
                        position -= 20;
                        dino.style.bottom = position + 'px';
                    }
                    
                }, 20);
            } else {       
                //Subindo
                position += 30;
                dino.style.bottom = position + 'px';
            }
        }, 10);
    }

    //Cria Cactus
    function createCactus() {
        if (gameOver == false) {

            const cactus = document.createElement('div');
            let cactusPosition = 1300;
            let randomTime = Math.random() * 4000;
            
            cactus.classList.add('cactus');
            cactus.style.left = 3000 + 'px';
            background.appendChild(cactus);
            
            //Move cactus
            let leftInterval = setInterval(() => {
                
                //Reseta Cactus
                if (cactusPosition < -60) {
                    clearInterval(leftInterval);
                    background.removeChild(cactus);
                } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
                    //GameOver
                    
                    clearInterval(leftInterval);
                    cactusPosition = 0;
                    document.body.innerHTML = "<h1 class='game-over'>Fim de Jogo</h1>" + "<h2 class='placar'> Seu placar foi de: " + pontos + " pontos! </h2>" + "<button class='botao' onClick='window.location.reload()'>Tentar Novamente</button>";
                    gameOver = true;
                    
                }else {            
                    cactusPosition -= 10;            
                    cactus.style.left = cactusPosition + 'px';
                }            
                
            }, 20)
            
            //Recursividade para criar um loop
            setTimeout(createCactus, randomTime)
        } 

    }

    
    createCactus();
    document.addEventListener('keydown', handleKeyDown);
}