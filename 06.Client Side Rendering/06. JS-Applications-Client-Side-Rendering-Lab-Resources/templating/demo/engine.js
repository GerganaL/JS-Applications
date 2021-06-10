export function renderTemplate(templateString, data) {
    const pattern = /{{(.+)}}/gm;

   return  templateString.replace(pattern, (match, propName) => data[propName]);

};

