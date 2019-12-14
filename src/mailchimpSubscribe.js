import jsonp from "jsonp";
import queryString from "query-string";
let { endpoint } = JSON.parse(MAILCHIMP_OPTIONS);

const subscribeToMailchimp = function addToMailchimp(email, fields) {
  const emailEncoded = encodeURIComponent(email);
  let url = endpoint.replace(/\/post/g, "/post-json");
  const listFields = fields ? "&" + queryString.stringify(fields) : "";
  const queryParams = `&EMAIL=${emailEncoded}${listFields}`;
  url = `${url}${queryParams}`;

  return new Promise((resolve, reject) =>
    jsonp(url, { param: "c", timeout: 3500 }, (err, data) => {
      if (err) reject(err);
      if (data) resolve(data);
    })
  );
};

export default subscribeToMailchimp;
