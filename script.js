// ==============================
// [A] 기존 "병명으로 찾기" 관련 데이터 및 함수
// 부위별 문제 데이터 (예시 데이터를 포함합니다)
const issuesData = {
  "face": [
    { 
      title: "여드름", 
      scientificName: "Acne Vulgaris",
      description: "여드름은 모공이 막혀 발생하는 염증성 피부 질환입니다.", 
      causeAnalysis: "호르몬 변화, 피지 분비 과다, 세균 감염 등이 주요 원인입니다.",
      research: "해외 연구 논문: 'The Pathogenesis of Acne Vulgaris'",
      solution: "규칙적인 세안과 항균제, 레티노이드 사용을 권장합니다.",
      items: "여드름 전용 폼클렌저, 약용 크림"
    },
    { 
      title: "다크서클", 
      scientificName: "Periorbital Hyperpigmentation",
      description: "다크서클은 눈 밑의 피부가 어둡게 보이는 현상입니다.", 
      causeAnalysis: "수면 부족, 유전적 요인, 혈액 순환 저하 등이 원인입니다.",
      research: "해외 연구 논문: 'Etiology of Periorbital Hyperpigmentation'",
      solution: "충분한 수면과 전용 아이크림 사용이 필요합니다.",
      items: "비타민 C 아이크림"
    }
    // 필요에 따라 추가 데이터 입력
  ],
  "scalp": [
    { 
      title: "비듬", 
      scientificName: "Seborrheic Dermatitis",
      description: "두피의 각질이 과도하게 발생하는 현상입니다.", 
      causeAnalysis: "건조한 두피, 곰팡이 감염 등이 원인입니다.",
      research: "해외 연구 논문: 'Seborrheic Dermatitis in Scalp'",
      solution: "약용 샴푸와 두피 보습이 필요합니다.",
      items: "비듬 전용 샴푸"
    },
    { 
      title: "탈모", 
      scientificName: "Androgenetic Alopecia",
      description: "호르몬 변화 및 유전적 요인으로 인한 모발 손실입니다.", 
      causeAnalysis: "호르몬 변화, 스트레스, 영양 부족 등이 주요 원인입니다.",
      research: "해외 연구 논문: 'Pathophysiology of Androgenetic Alopecia'",
      solution: "두피 관리와 약물 치료가 필요합니다.",
      items: "미녹시딜 토닉"
    }
  ]
  // "arms", "legs", "feet", "whole_body" 등 다른 부위 데이터도 필요시 추가
};

// 기존 "병명으로 찾기" (인터랙티브 몸 클릭 시)
function showIssues(part) {
  const issueContainer = document.getElementById("issues-container");
  document.getElementById("issue-title").textContent = `${getPartName(part)} 부위에서 발생할 수 있는 문제`;
  const issueList = document.getElementById("issues-list");
  issueList.innerHTML = "";

  if (issuesData[part]) {
    issuesData[part].forEach((issue, idx) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="article.html?part=${part}&index=${idx}">${issue.title}</a>`;
      issueList.appendChild(li);
    });
  } else {
    issueList.innerHTML = "<li>등록된 문제가 없습니다.</li>";
  }
  issueContainer.classList.remove("hidden");
}

function hideIssues() {
  document.getElementById("issues-container").classList.add("hidden");
}

function getPartName(part) {
  const mapping = {
    "face": "얼굴",
    "scalp": "두피",
    "arms": "팔",
    "legs": "다리",
    "feet": "발",
    "whole_body": "전신"
  };
  return mapping[part] || part;
}

// ==============================
// [B] 탭 전환 기능
function switchTab(tab) {
  if (tab === 'disease') {
    document.getElementById("disease-section").classList.remove("hidden");
    document.getElementById("symptom-section").classList.add("hidden");
    document.getElementById("tab-disease").classList.add("active");
    document.getElementById("tab-symptom").classList.remove("active");
  } else if (tab === 'symptom') {
    document.getElementById("symptom-section").classList.remove("hidden");
    document.getElementById("disease-section").classList.add("hidden");
    document.getElementById("tab-symptom").classList.add("active");
    document.getElementById("tab-disease").classList.remove("active");
  }
}

// ==============================
// [C] 증상으로 찾기 검색 기능
function searchSymptoms() {
  const query = document.getElementById("symptom-input").value.trim().toLowerCase();
  const selectedBodyPartInput = document.getElementById("body-part-input").value.trim().toLowerCase();
  const resultsList = document.getElementById("results-list");
  resultsList.innerHTML = "";

  let baseResults = [];
  let otherResults = [];

  // issuesData의 모든 부위 데이터를 순회하며 검색
  for (let part in issuesData) {
    issuesData[part].forEach((issue, idx) => {
      const combinedText = (issue.title + " " + issue.description + " " + issue.causeAnalysis).toLowerCase();
      if (combinedText.includes(query)) {
        // 선택한 부위가 입력되어 있고, 현재 부위가 선택한 부위와 일치하면 baseResults에 추가
        if (selectedBodyPartInput !== "" && getPartName(part).toLowerCase().includes(selectedBodyPartInput)) {
          baseResults.push({ part, idx, issue });
        } else {
          otherResults.push({ part, idx, issue });
        }
      }
    });
  }

  // 선택한 부위의 결과 출력
  if (baseResults.length > 0) {
    const baseHeading = document.createElement("h3");
    baseHeading.textContent = `선택한 부위 (${selectedBodyPartInput})에서의 결과`;
    resultsList.appendChild(baseHeading);
    baseResults.forEach(result => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="article.html?part=${result.part}&index=${result.idx}">${result.issue.title} (${getPartName(result.part)})</a>`;
      resultsList.appendChild(li);
    });
  }

  // 다른 부위 결과 출력
  if (otherResults.length > 0) {
    const otherHeading = document.createElement("h3");
    otherHeading.textContent = "다른 부위에서의 비슷한 증상";
    resultsList.appendChild(otherHeading);
    otherResults.forEach(result => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="article.html?part=${result.part}&index=${result.idx}">${result.issue.title} (${getPartName(result.part)})</a>`;
      resultsList.appendChild(li);
    });
  }

  if (baseResults.length === 0 && otherResults.length === 0) {
    resultsList.innerHTML = "<li>검색 결과가 없습니다.</li>";
  }

  document.getElementById("search-results").classList.remove("hidden");
}

// ==============================
// [D] 몸 선택 모달 기능 ("그림에서 선택하기")
function openBodySelector() {
  document.getElementById("body-selector-modal").classList.remove("hidden");
}

function closeBodySelector() {
  document.getElementById("body-selector-modal").classList.add("hidden");
}

function selectBodyPart(partName) {
  document.getElementById("body-part-input").value = partName;
  closeBodySelector();
}
