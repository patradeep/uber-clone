function LocationPanel({ suggestions = [], setPicup, setDropoff, activeField }) {
  const onSelectSuggestion = (suggestion) => {
    const p = suggestion.properties || {};
    const address = [p.name, p.city, p.state].filter(Boolean).join(", ");
    if (activeField === "picup") setPicup(address || p.name);
    else setDropoff(address || p.name);
  };

  return (
    <div>
      {/* Display fetched suggestions */}
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        suggestions.map((elem, idx) => {
          const p = elem.properties || {};
          const subtitle = [p.street, p.city, p.state].filter(Boolean).join(", ");

          return (
            <div
              key={idx}
              onClick={() => onSelectSuggestion(elem)}
              className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer hover:bg-gray-50"
            >
              <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full shrink-0">
                <i className="ri-map-pin-fill"></i>
              </h2>
              <div>
                <h4 className="font-medium text-sm text-gray-900">{p.name}</h4>
                {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 p-4">No suggestions available</div>
      )}
    </div>
  );
}

export default LocationPanel;
