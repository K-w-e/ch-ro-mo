const canvas = document.getElementById('canvas');
const videoDom = document.getElementById('video');
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientWidth, 1, 1000);
const mouse = new THREE.Vector2(0.2, 0.4);

var dogTexture;
if (window.innerWidth > 900)
  dogTexture = new THREE.TextureLoader().load('img/background.jpg');
else if (window.innerWidth < 900)
  dogTexture = new THREE.TextureLoader().load('img/m.background.jpg');

var quad = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertex-shader').textContent,
    fragmentShader: document.getElementById('fragment-shader').textContent,
    depthWrite: false,
    depthTest: false,
    uniforms: {
      dog: {
        type: "t",
        value: dogTexture
      },
      delta: {
        value: 1.0
      },
      mouse: {
        value: mouse
      },
      //filter: {
      //  value: true
      //},
      speed: {
        value: 0.5
      }
    }
  })
);
scene.add(quad);

function onResize() {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

function onMouseMove(e) {
  const x = (e.clientX / (window.innerWidth * 0.5)) - 1;
  const y = -1 * (e.clientY / (window.innerHeight * 0.5)) + 1;
  updateMouse(x, y);
}
function onTouchMove(e) {
  const x = (e.touches[0].clientX / (window.innerWidth * 0.5)) - 1;
  const y = -1 * (e.touches[0].clientY / (window.innerHeight * 0.5)) + 1;
  updateMouse(x, y);
}
function updateMouse(x, y) {
  TweenMax.to(mouse, 2, {
    x: x,
    y: y,
    onUpdate: function () {
      quad.material.uniforms.mouse.value = mouse;
    }
  })
}

function render(a) {
  requestAnimationFrame(render);

  quad.material.uniforms.delta.value = a;

  renderer.render(scene, camera);
}

// Start video
if (window.innerWidth > 910)
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment"
    },
    audio: false
  }).then(function (stream) {
    videoDom.srcObject = stream;
    videoDom.onloadedmetadata = function (e) {
      videoDom.play();
      quad.material.uniforms.dog.value = new THREE.VideoTexture(videoDom);
    };
  }).catch(function (error) {
    console.log(error);
  });

onResize();
window.addEventListener('resize', onResize);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('touchmove', onTouchMove);
//document.querySelector('#filter').addEventListener('change', function () {
//  quad.material.uniforms.filter.value = this.checked;
// })
//document.querySelector('#speed').addEventListener('input', function () {
// quad.material.uniforms.speed.value = parseInt(this.value) / 100;
// })
requestAnimationFrame(render);


