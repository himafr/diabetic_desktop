onload = () => {
  loadingPage(3);
    getAllBooks(0);
  };
  
  function getAllBooks(page) {
    pg = page;
    let loaderA= $("#loader");
    
    loaderA.toggleClass("hide")
    fetch(`${url_dev}api/v1/books/admin?page=${pg}`, {
      headers: {
        Authorization: `Bearer ${localStorage.jwt_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((res) => {
    loaderA.toggleClass("hide")
      if (res.status !== "success") {
        $("#h_books").html(res.message);
      } else {
        const {books,nums}=res.data;
          let s=Math.ceil(nums[0].nums/6);
          $("#next").removeClass("disabled");
          $("#prev").removeClass("disabled");
          $("#prev").attr("onclick","getAllBooks(pg-1)");
          $("#next").attr("onclick","getAllBooks(pg+1)");
          if(s==pg+1){
            $("#next").addClass("disabled");
            $("#prev").removeClass("disabled");
            $("#next").attr("onclick","null");
          }
          if(pg==0){
            $("#next").removeClass("disabled");
            $("#prev").addClass("disabled");
            $("#prev").attr("onclick","null");
          }
          $("#h_books").empty();
          $("#pages").empty();
           
          books.forEach((element) => {
            const bookHTML = `
            <div class="card-column">
            <div class="card">
              <img onclick="start(${element.book_id})" src="${url_dev +"get/" +element.book_photo}"alt="Jane" >
              <div class="card-container">
              <h4>${ element.book_title }</h4>
              <p class="summary">${element.book_summary.substring(0, 200)}...</p>
              <p>this book was added by Admin</p>
              </div>
              </div>
              </div>
                    `;
                    
                    $("#h_books").append( bookHTML);
                    
                  });
                  for (let i=0; i<s; i++){
                    $("#pages").append(`
             <li class="tm-paging-item ${pg==i&&"active"}">
        <a onclick="getAllBooks(${i})" class="mb-2 tm-btn tm-paging-link"
        >${i+1}</a
        >
        `)
        
      }
    }
  })
  .catch((error) => {
    loaderA.toggleClass("hide")
        $("#h_books").html( "An error occurred while fetching books.");
      });
    }
    function getBookById(id,loader) {
      loader.toggleClass("hide");
      fetch(`${url_dev}api/v1/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((res) => {
        loader.toggleClass("hide");
        if (res.status !== "success") {
          // $("#h_books").html = res.message;
        } else {
          const {book}=res.data;      
          $("#book-title").val(book.book_title);
          $("#book-desc") .val(book.book_desc);
          $("#book-summary") .val(book.book_summary);
          
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        loader.toggleClass("hide");
      });
    }
    
    function loadingPage(n){
      for(let i=0; i<n; i++){

        $("#h_books").append( `
        <div class="card-column">
        <div class="card">
        <img  class="skeleton"  >
        <div class="card-container">
        <div>                  <div class=" w-118 h-16 skeleton" style="margin: 10px;"></div>
        </div>
        <h4>                  <div class=" w-182 h-16 skeleton"></div>
        </h4>
        <p class="title">                  <div class=" w-118 h-16 skeleton" ></div>
        </p>
        <p class="summary">                  <div class=" w-320 h-16 skeleton" ></div>
        </p>
        <p>example@example.com</p>
        </div>
        </div>
        </div>`);
        }
      
    }