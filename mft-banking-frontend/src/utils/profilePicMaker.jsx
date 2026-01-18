const profilePicMaker = (name, style ) => {
  if (!name) return null;

  const firstLetter = name.charAt(0).toUpperCase();

  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F1C40F",
    "#9B59B6",
    "#E67E22",
    "#1ABC9C",
    "#E91E63",
  ];

  const colorIndex = name.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div
      jsx="true"
      style={{ backgroundColor: bgColor }}
      className={style}
      //className="rounded-full flex items-center justify-center text-white font-semibold select-none"
    >
      {firstLetter}
    </div>
  );
};

export default profilePicMaker;
