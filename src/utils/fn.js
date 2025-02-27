function refresh() {
    document
      .getElementById("refresh")
      .classList.add("animate__animated", "animate__rotateIn");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  // check if object empty

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
  function checkNotSet(data, word, url) {
    if (data === "not set") return word;
    else if (url != undefined) return url+"get/" + data;
    else return data;
  }
  function sayHi(){
    alert('Hello, World!');
  }
  async function  updateData(url,data,loader) {

    loader.classList.toggle("hide");
    let sData = await fetch(`${url_dev+url}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.jwt_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res=await sData.json();
    loader.classList.toggle("hide");
    return res; 
}