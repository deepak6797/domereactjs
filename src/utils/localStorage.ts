
export const SetHighlightsToLocalStorage = (highlights: any) => {
  localStorage.setItem("highlights", JSON.stringify(highlights));
};

export const SetIncludedToLocalStorage = (highlights: any) => {
  localStorage.setItem("included", JSON.stringify(highlights));
};

export const SetExcludedToLocalStorage = (highlights: any) => {
  localStorage.setItem("excluded", JSON.stringify(highlights));
};

