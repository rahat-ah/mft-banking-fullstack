const nameSize = (name) => {
    return name.length > 6 ? "xs:text-sm md:text-lg" : "text-lg";
};

export default nameSize