const mainUrl = "http://localhost:3000/";
let loader = document.getElementById("loader");
onload = () => {
  fillPageData();
};

const date = new Date().getFullYear();
const dialog = document.querySelector(`dialog`);
const form = dialog.querySelector(`form`);
const btnLogin = document.querySelector(`#btn-login`);
const inputFname = document.querySelector(`#input-fname`);
const inputLname = document.querySelector(`#input-lname`);
const inputEmail = document.querySelector(`#input-email`);
const inputPhone = document.querySelector(`#input-phone`);
const inputAddress = document.querySelector(`#input-address`);
const btnCancelDialog = document.querySelector(`#btn-cancel`);
const output = document.querySelector(`output`);
const inputBirthDate = document.querySelector(`#input-birth-date`);
const maxDate = `${date - 5}-01-01`;
const minDate = `${date - 95}-01-01`;
inputBirthDate.min = minDate;
inputBirthDate.max = maxDate;
btnLogin.onclick = () => {
  form.reset();
  dialog.showModal();
};
btnCancelDialog.onclick = (e) => {
  e.preventDefault();
  output.innerHTML = "";
  dialog.close();
};

form.onsubmit = (e) => {
  e.preventDefault();
  [fname, lname, email, phone, address, birth] = [
    inputFname.value,
    inputLname.value,
    inputEmail.value,
    inputPhone.value,
    inputAddress.value,
    inputBirthDate.value,
  ];
  let dataToBeSent = {
    ...(fname != "" && { first_name: fname }),
    ...(lname != "" && { last_name: lname }),
    ...(email != "" && { email: email }),
    ...(phone != "" && { number: phone }),
    ...(address != "" && { address: address }),
    ...(birth != "" && { date_of_birth: birth }),
  };

  if (!isEmpty(dataToBeSent)) {
  loader.classList.toggle("hide");
  fetch(`${url_dev}api/v1/users/id`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.jwt_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToBeSent),
  })
    .then((response) => response.json())
    .then((res) => {
      loader.classList.toggle("hide");
      if (res.status == "success") {
        fillPageData();
      }
    });
  output.innerHTML = `<pre>${JSON.stringify(dataToBeSent)}</pre>`;

    dialog.close();
  }
};

function changePhoto(type) {
  let change_photo = document.getElementById(`change_${type}`);
  loader.classList.toggle("hide");
  const formData = new FormData();
  formData.append(
    type,
    document.getElementById(`input_${type}_photo`).files[0]
  );
  change_photo.disabled = true;
  fetch(`${url_dev}api/v1/users/${type}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.jwt_token}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((res) => {
      loader.classList.toggle("hide");
      if (res.status == "success") {
        window.location.reload();
      } else {
        alert(res.message);
      }
      change_photo.disabled = false;
    })
    .catch((error) => {
      loader.classList.toggle("hide");
      alert(error);
      change_photo.disabled = false;
    });
}
let about = document.getElementById("about");
let stat = document.getElementById("stat");
let user_information = document.getElementById("user_information");
let user_stat = document.getElementById("user_stat");

// bottom border
function about_user() {
  if (about.classList.contains("btmb")) return;
  about.classList.toggle("btmb");
  stat.classList.toggle("btmb");
  user_information.classList.toggle("hide");
  user_stat.classList.toggle("hide");
}
function stat_user() {
  if (stat.classList.contains("btmb")) return;
  about.classList.toggle("btmb");
  stat.classList.toggle("btmb");
  user_information.classList.toggle("hide");
  user_stat.classList.toggle("hide");
}



function fillPageData() {
  loader.classList.toggle("hide");
  fetch(`${url_dev}api/v1/users/id`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.jwt_token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      
      loader.classList.toggle("hide"); 
      if (res.status == "success") {
        const { user } = res.data;
        document.getElementById("full_name").innerHTML =
          user.first_name + " " + checkNotSet(user.last_name, "");

        document.getElementById("cover_photo").src = checkNotSet(
          user.cover_photo,
          "../images/about-01.jpg",
          url_dev
        );
        $(".poster").removeClass("skeleton")

        document.getElementById("user_photo").src = checkNotSet(
          user.photo,
          "../images/about-02.jpg",
          url_dev
        );

        document.getElementById("user_full_name").innerHTML =
          user.first_name + " " + checkNotSet(user.last_name, "");
        document.getElementById(`user-rating`).innerHTML=res.data.review.length;

        document.getElementById("user_role").innerHTML = user.role;
        document.getElementById("user_email").innerHTML = user.email;
        document.getElementById("user_phone").innerHTML = user.number;
        document.getElementById("user_address").innerHTML = user.address;

        document.getElementById("date_of_birth").innerHTML = new Date(
          user.date_of_birth
        ).toDateString();
        document.getElementById("join_date").innerHTML = new Date(
          user.created_at
        ).toUTCString();

      } else {
        // document.getElementById('error').innerHTML=res.message;
      }
    })
    .catch((error) => {
      loader.classList.toggle("hide");
      $(".skeleton").removeClass("skeleton")
      // document.getElementById('error').innerHTML=error;
      alert(error);
    });
}
