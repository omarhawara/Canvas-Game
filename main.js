// 75 - test gsap
// console.log(gsap);
// 1- select canvas element
const canvas = document.querySelector("#canvas");
// 97 - get the score span element
const scoreEl = document.querySelector("#scoreEl");
// 107 start game button
const startGameBtn = document.querySelector("#startGameBtn");
// 108 - get the modal element
const modalEl = document.querySelector("#modalEl");
// 113 - get big score span
const bigScore = document.querySelector("#bigScore");
// 2- check selector with console
// console.log(canvas);
// 3- explain innerWidth / innerHeight
// console.log(innerHeight);
// console.log(window.innerHeight);
// console.log(window.innerWidth);
// console.log(innerWidth);
// 4- gave the canvas full screen width and height
canvas.height = innerHeight;
canvas.width = innerWidth;
// 5- fix the default screen margin, remove body margin
// 6- create canvas context api, read more about canvas context api
const ctx = canvas.getContext("2d");
// context can be 2d or 3d we need 2d in our project
// console.log(ctx);
// 7- create a class to draw a circle
class Player {
  // ask about player property
  // size
  // color
  // position
  // velocity
  // 8- create class constructor / explain what it is
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  // 11- draw the player function
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // 12- colorize the player
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// 9- create player clone
// const player = new Player(100, 100, 30, "blue");
// 10- check player in console
// console.log(player);
// call draw function
// player.draw();

// 13 - create x var and assign it to middle screen in x
const x = canvas.width / 2;
// 14 - create y var and assign it to middle screen in y
const y = canvas.height / 2;
// 15 - centered the player
let player = new Player(x, y, 10, "white"); // 66 update player color and size

// 16 - create Projectile class
class Projectile {
  // 18 - create constructor
  constructor(x, y, radius, color, velocity) {
    // 19 - projectile properties
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  // 20 - draw projectile
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    // 35 - draw projectiles before update
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
// 17 - create Enemy class
class Enemy {
  // 42 - start work with enemy class
  constructor(x, y, radius, color, velocity) {
    // 19 - projectile properties
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}
// 77 - create particle class
// 92 - create friction to slow down the particle speed
const friction = 0.99;
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    // 81 - add alpha property to get fade out effect
    this.alpha = 1;
  }
  draw() {
    // 82 - save the current value
    ctx.save();
    // 84 - set global alpha
    // ctx.globalAlpha = 0.1;
    // 86 - assign to alpha
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    // 83- refetch the old stat, (the code above)
    ctx.restore();
  }
  update() {
    this.draw();
    // 93 - slow down the speed
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    // 85 - subtract the alpha
    this.alpha -= 0.01;
  }
}

let enemies = [];

// 43 - create enemy generator function
function enemyGenerator() {
  setInterval(() => {
    // 44 - create enemy
    // 47 - random x, y
    // const x = Math.random() * canvas.width;
    // const y = Math.random() * canvas.height;
    // 48 - get enemy from left right side from out out of screen
    // const x =  0 - radius;
    // const y =  0 - radius;
    // 49
    // const x = Math.random() > 0.5 ? 0 - radius : radius + canvas.width;
    // const y = Math.random() > 0.5 ? 0 - radius : radius + canvas.height;
    // 50 - random x, y
    // 51 - random radius between 0/30
    // const radius = Math.random() * 30;
    // 52 - avoid the 4 number and under 4
    const radius = Math.random() * (30 - 4) + 4;
    let x;
    let y;
    if (Math.random() < 0.5) {
      x = Math.random() > 0.5 ? 0 - radius : radius + canvas.width;
      y = Math.random() * canvas.height;
    } else {
      x = Math.random() * canvas.width;
      y = Math.random() > 0.5 ? 0 - radius : radius + canvas.height;
    }
    // 69 - random color
    // const color = "hsl(0, 50%, 50%)";
    // const color = "hsl(Math.random() * 360, 50%, 50%)"; // white color, use back quit to get dynamic value
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    // 45 - update the velocity
    // const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2);
    // 46 - update the direction
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    // 39 - crate velocity variable
    const velocity = {
      x: Math.cos(angle), // -1/1
      y: Math.sin(angle), // -1/1
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);
}

// 31 - comment out the project clone
// const projectile = new Projectile(
//   canvas.width / 2,
//   canvas.height / 2,
//   10,
//   "red",
//   {
//     x: 1,
//     y: 1,
//   }
// );

// 33 - create projectiles array to push in every project clone when user click on screen
let projectiles = [];
// 78 - create particles array
let particles = [];
// 59 - create animationId var, init with undefined
// then in animate function reassign to requestAnimationFrame(animate);
let animateId;
// 98 - create score var
let score = 0;
// 23 - create animate function
// 114 - init game, reset values to start game again
function init() {
  player = new Player(x, y, 10, "white");
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  scoreEl.innerHTML = score;
  bigScore.innerHTML = score;
}
function animate() {
  animateId = requestAnimationFrame(animate);
  // console.log(111);
  // 30 - explain var scop, move projectile variable to outside addEventListener
  // 32 - delete the tow functions
  // projectile.draw();
  // projectile.update();
  // 34 - loop through projectiles array
  // 40 - clear the canvas every click event
  // 64 - fillStyle to get our black bg color
  // ctx.fillStyle = "black";
  // 65 - update fillStyle color to rgba to get the fade effect
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  // 63 - colorize the game, replace clearRect with fillRect
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // 41 - move player draw function right after clearRect
  player.draw();
  projectiles.forEach((projectile, index) => {
    projectile.update();
    // 61 - remove projectiles out of screen, / 4 directions
    if (
      projectile.x + projectile.radius < 0 ||
      projectile.x - projectile.radius > canvas.width ||
      projectile.y + projectile.radius < 0 ||
      projectile.y - projectile.radius > canvas.height
    ) {
      projectiles.splice(index, 1);
    }
  });
  // 80 - animate the particles
  particles.forEach((particle) => {
    // 87 - remove the particle if its alpha is less then or equal to zero
    if (particle.alpha <= 0) {
      // 88 - note we use indexOf to get the index of particle, we can use indexParticle the second parameter in forEach loop also
      particles.splice(particles.indexOf(particle), 1);
    } else {
      particle.update();
    }
  });
  enemies.forEach((enemy, index) => {
    enemy.update();

    // 56 - work with lose case, if enemy touch the player, so we work on plyer and each enemy
    // Note we use the same variable name (dist), here we can talk about variable scope and chine
    const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    // 57 - end the game
    if (dist - enemy.radius - player.radius < 1) {
      // 58 - end the game, but how it is
      // on order to end the game we should cancel the requestAnimationFrame function
      // to do so look at step 59/60
      // 60 - here how we cancel the animation
      cancelAnimationFrame(animateId);
      // 112 - restart the game
      modalEl.style.display = "flex";
      // 113 - inner final the score
      bigScore.innerHTML = score;
    }
    // 53 - matching projectile and enemy case
    projectiles.forEach((projectile, projectileIndex) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
      // console.log(dist);
      // 54 - objects touch
      if (dist - enemy.radius - projectile.radius < 1) {
        // 55 - remove the flash effect, when projectile touch enemy, all enemies flashed in the screen, because we removed from array
        // using settimeout to delete this flash effect

        // 99 - increase the score var
        // score += 100;
        // 100 - print the score to spanEl element
        // scoreEl.innerHTML = score;
        // 79 - create particles
        // for (let i = 0; i < 8; i++) {
        // 90 - create particles as enemy size
        for (let i = 0; i < enemy.radius * 2; i++) {
          particles.push(
            // new Particle(projectile.x, projectile.y, 3, enemy.color, {
            // 89 - random the radius
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2,
              enemy.color,
              {
                // x: Math.random() - 0.5, // to get negative value
                // y: Math.random() - 0.5, // to get negative value
                // 91 - increase the velocity
                x: (Math.random() - 0.5) * (Math.random() * 6),
                y: (Math.random() - 0.5) * (Math.random() * 6),
              }
            )
          );
        }
        // 70 start shrank enemies
        // if (enemy.radius> 10) {
        // if (enemy.radius - 10 > 10) {
        if (enemy.radius - 10 > 5) {
          // 76 - small to 5
          // 71 - resize enemy if match
          // enemy.radius -= 10;
          // 75 - transition the enemy resize effect using gsap lib
          // 101 logic for shrink and kill the enemy
          // 102 - increase score by 100 if shrink
          score += 100;
          // 103 - print the score to spanEl element
          scoreEl.innerHTML = score;
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          // 72 - we need to remove the projectile, if not the projectile matching the enemy again, we do not want this
          // projectiles.splice(projectileIndex, 1);
          // 73 - wrap removing inside setTimeout function
          setTimeout(() => {
            projectiles.splice(projectileIndex, 1);
          }, 0);
        } else {
          // 104 - increase score by 250 if kill
          score += 250;
          // 105 - print the score to spanEl element
          scoreEl.innerHTML = score;
          setTimeout(() => {
            enemies.splice(index, 1);
            projectiles.splice(projectileIndex, 1);
          }, 0);
        }
      }
    });
  });
}

// 21 - add click event listener
addEventListener("click", (event) => {
  // 62 - check if projectiles removed out of screen
  // console.log(projectiles);
  // 22 - create projectile clones
  // check x, y
  // console.log(event);
  // const x = event.clientX;
  // const y = event.clientY;
  // const projectile = new Projectile(
  //   event.clientX,
  //   event.clientY,
  //   10,
  //   "red",
  //   null
  // );
  // const projectile = new Projectile(
  //   canvas.width / 2,
  //   canvas.height / 2,
  //   10,
  //   "red",
  //   null
  // );
  // 28 - update the velocity
  // const projectile = new Projectile(
  //   canvas.width / 2,
  //   canvas.height / 2,
  //   10,
  //   "red",
  //   {
  //     x: 1,
  //     y: 1,
  //   }
  // );
  // 29 - move draw, update function to inside animate function
  // 23 - show the angle between player and where we click, from center to projectile position draw the triangle
  // 24 - calc the triangle angle by using atan2 method
  // 25 - calc the projectile velocity by using the angle
  // 26 - update the projectile position
  // 27 - get the x by using sig() function, get projectile y by using cos() function
  // like so x = sig(angle), y = cos(angle)
  // 36 - create new Projectile clone on every click
  // const projectile = new Projectile(
  //   canvas.width / 2,
  //   canvas.height / 2,
  //   10,
  //   "red",
  //   {
  //     x: 1,
  //     y: 1,
  //   }
  // );
  // const projectile2 = new Projectile(
  //   canvas.width / 2,
  //   canvas.height / 2,
  //   10,
  //   "green",
  //   {
  //     x: -1,
  //     y: -1,
  //   }
  // );
  // 37 - push the new clone into projectiles array
  // create angle variable using atan2 math function
  // 38 - const angle = Math.atan2(y, x)
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  // 39 - crate velocity variable
  const velocity = {
    // 68 - increase the projectile speed
    x: Math.cos(angle) * 5, // -1/1
    y: Math.sin(angle) * 5, // -1/1
  };
  // console.log(angle);
  // console.log(projectiles);
  // 67 - colored the projectile to white
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 5, "white", velocity)
  );
});

startGameBtn.addEventListener("click", () => {
  // 115 - re init the game
  init();
  // 108 - move starter game function into callback function
  animate();
  enemyGenerator();
  // 110 - remove the modal from screen after start game
  modalEl.style.display = "none";
});