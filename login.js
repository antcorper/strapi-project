//http://localhost:1337//api/auth/local/
// identifier:email1@gmail.com
// password:Password

checkToken();

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData(form);
});

async function sendData(form) {
  try {
    const formData = new FormData(form);
    const queryString = new URLSearchParams(formData).toString();
    const response = await fetch("http://localhost:1337/api/auth/local/", {
      method: "POST",
      body: queryString,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    //si algo está escrito mal:
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

//para almacenar las credenciales (const data) del usuario en el navegador
function doLogin(data) {
  localStorage.setItem("token", data.jwt);
  window.location.href = "index.html";
}

function checkToken() {
  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = "login.html";
  }
}
