onload = () => {
  loadingPage(3);
    getAllRecipes(0);
  };
  
  function getAllRecipes(page) {
    pg = page;
    let loaderA= $("#loader");
    
    loaderA.toggleClass("hide")
    fetch(`${url_dev}api/v1/recipes?page=${pg}`, {
      headers: {
        Authorization: `Bearer ${localStorage.jwt_token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((res) => {
    loaderA.toggleClass("hide")
      if (res.status !== "success") {
        $("#h_recipes").html(res.message);
      } else {
        const {recipes,nums}=res.data;
          let s=Math.ceil(nums[0].nums/6);
          $("#next").removeClass("disabled");
          $("#prev").removeClass("disabled");
          $("#prev").attr("onclick","getAllRecipes(pg-1)");
          $("#next").attr("onclick","getAllRecipes(pg+1)");
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
          $("#h_recipes").empty();
          $("#pages").empty();
           
          recipes.forEach((element) => {
            const recipeHTML = `
            <div class="card-column">
            <div class="card">
              <img onclick="start(${element.recipe_id})" src="${url_dev +"get/" +element.recipe_photo}"alt="Jane" >
              <div class="card-container">
              <p>${element.category_name} </p>
              <h4>${ element.recipe_name }</h4>
              <p class="summary">${element.ingredients.substring(0, 200).replace(/##/g," ")}...</p>
              <p class="summary">${element.instructions.substring(0, 200).replace(/##/g," ")}...</p>
              </div>
              </div>
              </div>
                    `;
                    
                    $("#h_recipes").append( recipeHTML);
                    
                  });
                  for (let i=0; i<s; i++){
                    $("#pages").append(`
             <li class="tm-paging-item ${pg==i&&"active"}">
        <a onclick="getAllRecipes(${i})" class="mb-2 tm-btn tm-paging-link"
        >${i+1}</a
        >
        `)
        
      }
    }
  })
  .catch((error) => {
    loaderA.toggleClass("hide")
        $("#h_recipes").html( "An error occurred while fetching recipes.");
      });
    }
    function getRecipeById(id,loader) {
      loader.toggleClass("hide");
      fetch(`${url_dev}api/v1/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.json())
      .then((res) => {
        loader.toggleClass("hide");
        if (res.status !== "success") {
          // $("#h_recipes").html = res.message;
        } else {
          const {recipe}=res.data;      
          $("#recipe-name").val(recipe.recipe_name);
          $("#ingredients") .val(recipe.ingredients);
          $("#instructions") .val(recipe.instructions);
          $("#category_id") .val(recipe.category_id);
          
        }
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        loader.toggleClass("hide");
      });
    }
    
    function loadingPage(n){
      for(let i=0; i<n; i++){

        $("#h_recipes").append( `
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