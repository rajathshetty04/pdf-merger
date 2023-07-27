document.querySelector("#fileUpload").addEventListener("change", function () {
  let selectedFiles = [...this.files];

  if (selectedFiles.length > 2) {
    alert("You can select up to 2 files.");
    this.value = "";
  } else {
    const selectedFilesElement = document.querySelector(".selectedFiles");
    selectedFilesElement.innerHTML = "";
    selectedFiles.forEach((file) => {
      fileElement = document.createElement("div");
      fileElement.innerHTML = file.name;
      selectedFilesElement.appendChild(fileElement);
    });
  }
});
