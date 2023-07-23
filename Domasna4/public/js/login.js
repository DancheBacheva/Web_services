const login = async ( mejl, lozinka) => {
  try{
    const res = await axios({
      method: "POST",
      url: "api/v1/login",
      data: {
        mejl,
        lozinka,
      },
    });
    window.location.href = "/viewOglasi";
  }catch(err){
    console.log(err);
  }
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const mejl = document.getElementById("mejl").value;
  const lozinka = document.getElementById("lozinka").value;
  login(mejl, lozinka);
});