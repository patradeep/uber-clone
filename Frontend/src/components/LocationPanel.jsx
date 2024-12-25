function LocationPanel({ suggestions = [], setPicup, setDropoff, activeField }) {
  const onSelectSuggestion = (suggestion) => {
    if (activeField === "picup") setPicup(suggestion.description);
    else setDropoff(suggestion.description);
  };

  return (
    <div>
      {/* Display fetched suggestions */}
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        suggestions.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => onSelectSuggestion(elem)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem.description}</h4>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 p-4">No suggestions available</div>
      )}
    </div>
  );
}

export default LocationPanel;
