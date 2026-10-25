// HTML에서 버튼과 메뉴를 찾는다.
const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

// ☰ 버튼을 클릭했을 때 실행한다.
menuButton.addEventListener("click", function () {
  // open을 추가하거나 제거하고, 현재 열림 여부를 저장한다.
  const isOpen = navigation.classList.toggle("open");

  // 열렸으면 ✕, 닫혔으면 ☰로 버튼 글자를 변경한다.
  menuButton.textContent = isOpen ? "✕" : "☰";
});
// 메뉴 여러 개를 하나의 배열에 저장한다.
const menus = [
  {
    name: "아메리카노",
    description: "고소하고 깔끔한 대표 커피",
    price: 4000,
    category: "coffee",
  },
  {
    name: "카페라테",
    description: "부드러운 우유와 진한 에스프레소",
    price: 4500,
    category: "coffee",
  },
  {
    name: "바닐라라테",
    description: "은은한 바닐라 향의 달콤한 라테",
    price: 5000,
    category: "coffee",
  },
  {
    name: "모카라테",
    description: "진한 에스프레소와 달콤한 초콜릿이 어우러진 라테",
    price: 5500,
    category: "coffee",
  },
  {
    name: "딸기라테",
    description: "신선한 딸기와 우유로 만든 음료",
    price: 5500,
    category: "nonCoffee",
  },
  {
    name: "고구마라테",
    description: "달콤한 고구마와 부드러운 우유로 만든 포근한 라테",
    price: 5500,
    category: "nonCoffee",
  },
  {
    name: "말차라테",
    description: "쌉싸름한 말차와 고소한 우유가 조화로운 라테",
    price: 5800,
    category: "nonCoffee",
  },
];
// HTML의 빈 메뉴 상자를 찾는다.
// HTML에서 메뉴 카드가 들어갈 빈 상자를 찾는다.
const menuList = document.querySelector("#menuList");

// 전달받은 메뉴들을 화면에 표시하는 함수
function renderMenus(menuItems) {
  // 기존에 표시된 메뉴 카드를 모두 지운다.
  menuList.innerHTML = "";

  // 전달받은 메뉴를 하나씩 반복한다.
  menuItems.forEach(function (menu) {
    const menuCard = document.createElement("article");

    menuCard.classList.add("menu-card");

    menuCard.innerHTML = `
      <h3>${menu.name}</h3>
      <p>${menu.description}</p>
      <strong>${menu.price.toLocaleString()}원</strong>
    `;

    menuList.appendChild(menuCard);
  });
}

// 페이지가 처음 열리면 전체 메뉴를 표시한다.
renderMenus(menus);
// 모든 필터 버튼을 찾는다.
const filterButtons = document.querySelectorAll(".filter-button");

// 찾은 버튼마다 클릭 기능을 연결한다.
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // 클릭한 버튼의 data-category 값을 가져온다.
    const selectedCategory = button.dataset.category;

    // 우선 전체 메뉴를 표시 대상으로 정한다.
    let filteredMenus = menus;

    // 전체 버튼이 아니라면 같은 category를 가진 메뉴만 남긴다.
    if (selectedCategory !== "all") {
      filteredMenus = menus.filter(function (menu) {
        return menu.category === selectedCategory;
      });
    }

    // 선택된 메뉴만 다시 화면에 표시한다.
    renderMenus(filteredMenus);

    // 모든 버튼에서 active를 제거한다.
    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove("active");
    });

    // 방금 클릭한 버튼에만 active를 추가한다.
    button.classList.add("active");
  });
});
// 문의 폼과 필요한 입력창들을 HTML에서 찾는다.
const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#nameInput");
const inquiryInput = document.querySelector("#inquiryInput");
const formMessage = document.querySelector("#formMessage");

// 문의 폼이 제출될 때 실행한다.
contactForm.addEventListener("submit", function (event) {
  // 제출할 때 페이지가 새로고침되는 기본 동작을 막는다.
  event.preventDefault();

  // 입력된 글을 가져오고, 앞뒤의 불필요한 공백을 제거한다.
  const name = nameInput.value.trim();
  const inquiry = inquiryInput.value.trim();

  // 이름 또는 문의 내용이 비어 있는지 검사한다.
  if (name === "" || inquiry === "") {
    formMessage.textContent = "이름과 문의 내용을 모두 입력해주세요.";

    // 여기서 함수 실행을 종료한다.
    return;
  }

  // 두 입력값이 모두 있으면 완료 문구를 표시한다.
  formMessage.textContent = `${name}님, 문의가 접수되었습니다.`;

  // 입력창을 다시 비운다.
  contactForm.reset();
});
