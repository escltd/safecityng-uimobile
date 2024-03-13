import axios from "axios";

export const HTTP = () => {
  const instance = axios.create({
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  // middle ware to redirect user back to login if needs authourization
  // e.g if response Code is 401 and authorization required
  // instance.interceptors.response.use(
  //   function (response) {
  //     const { data } = response;
  //     if (data?.Code === 401) {
  //       window.location.replace("/auth/login");
  //     }
  //     return response;
  //   },
  //   function (error) {
  //     return Promise.reject(error);
  //   }
  // );
  return instance;
};


export const validEmail = (email: string): boolean => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.toLowerCase());
};

export const validMobile = (mobile: string): boolean => {
  return /^[0-9+]{11,}$/.test(mobile);
};

export const delayKeyup = (fn: Function, delay: number) => {
  let timer: any;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export function truncateNumber(value: string, decimal = 2) {
  // return (Math.trunc(value * Math.pow(10, decimal)) / Math.pow(10, decimal))
  // return parseFloat((Math.trunc(value * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal))
  // let truncatedNumber = Number(parseFloat(Math.trunc(value * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal))

  const truncatedNumber = parseFloat(
    parseFloat(value)
      .toFixed(decimal)
      .replace(/(?:\.0+|(\.\d+?)0+)$/, '$1'),
  );
  // if (truncatedNumber < 0) {
  //     truncatedNumber = 0
  // }
  return truncatedNumber;
}

export function humanNumber(nStr: string) {
  nStr = `${truncateNumber(nStr)}`;
  // nStr += "";
  const x = nStr.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? `.${x[1]}` : '.0';
  x2 = x2.length === 2 ? `${x2}0` : x2;
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1,$2');
  }
  return x1 + x2;
}



export function humanTime(time: any) {
  if (time === undefined) {
    return "";
  }

  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original
}

export function dateConvert(date: string) {
  if (date !== "") {
    date = `${new Date(date).toDateString()}`;
  }

  return date;
}

export function dateTimeConvert(dateTime: string) {
  if (dateTime !== "") {
    dateTime = `${new Date(dateTime).toDateString()} ${humanTime(
      new Date(dateTime.replace(" ", "T")).toTimeString().substring(0, 8)
    )}`;
  }

  return dateTime;
}

export const generateReferenceCode = () =>{
  const timestamp = new Date().toISOString().replace(/[-T:Z.]/g, ''); // Convert timestamp to string and remove special characters
  const uniqueId = Math.random().toString(36).substring(2, 17); // Generate a random alphanumeric string

  const referenceCode = `${timestamp}-${uniqueId}`;
  return referenceCode;
}

export const isoCountries = [
  { "country": "Nigeria", "code": "234", "iso": "NG", "flag": "🇳🇬" },
];

export const isoCountriesAll = [
  { "country": "Nigeria", "code": "234", "iso": "NG", "flag":"🇳🇬" },
  { "country": "Canada", "code": "1", "iso": "CA", "flag":"🇨🇦" },
  { "country": "United Kingdom", "code": "44", "iso": "GB", "flag":"🇬🇧" },
  { "country": "United States", "code": "1", "iso": "US", "flag":"🇺🇸" },
  
  { "country": "Afghanistan", "code": "93", "iso": "AF", "flag":"🇦🇫" },
  { "country": "Albania", "code": "355", "iso": "AL", "flag":"🇦🇱" },
  { "country": "Algeria", "code": "213", "iso": "DZ", "flag":"🇩🇿" },
  { "country": "American Samoa", "code": "1684", "iso": "AS", "flag":"🇦🇸" },
  { "country": "Andorra", "code": "376", "iso": "AD", "flag":"🇦🇩" },
  { "country": "Angola", "code": "244", "iso": "AO", "flag":"🇦🇴" },
  { "country": "Anguilla", "code": "1264", "iso": "AI", "flag":"🇦🇮" },
  { "country": "Antarctica", "code": "672", "iso": "AQ", "flag":"🇦🇶" },
  { "country": "Antigua and Barbuda", "code": "1268", "iso": "AG", "flag":"🇦🇬" },
  { "country": "Argentina", "code": "54", "iso": "AR", "flag":"🇦🇷" },
  { "country": "Armenia", "code": "374", "iso": "AM", "flag":"🇦🇲" },
  { "country": "Aruba", "code": "297", "iso": "AW", "flag":"🇦🇼" },
  { "country": "Australia", "code": "61", "iso": "AU", "flag":"🇦🇺" },
  { "country": "Austria", "code": "43", "iso": "AT", "flag":"🇦🇹" },
  { "country": "Azerbaijan", "code": "994", "iso": "AZ", "flag":"🇦🇿" },
  { "country": "Bahamas", "code": "1242", "iso": "BS", "flag":"🇧🇸" },
  { "country": "Bahrain", "code": "973", "iso": "BH", "flag":"🇧🇭" },
  { "country": "Bangladesh", "code": "880", "iso": "BD", "flag":"🇧🇩" },
  { "country": "Barbados", "code": "1246", "iso": "BB", "flag":"🇧🇧" },
  { "country": "Belarus", "code": "375", "iso": "BY", "flag":"🇧🇾" },
  { "country": "Belgium", "code": "32", "iso": "BE", "flag":"🇧🇪" },
  { "country": "Belize", "code": "501", "iso": "BZ", "flag":"🇧🇿" },
  { "country": "Benin", "code": "229", "iso": "BJ", "flag":"🇧🇯" },
  { "country": "Bermuda", "code": "1441", "iso": "BM", "flag":"🇧🇲" },
  { "country": "Bhutan", "code": "975", "iso": "BT", "flag":"🇧🇹" },
  { "country": "Bolivia", "code": "591", "iso": "BO", "flag":"🇧🇴" },
  { "country": "Bosnia and Herzegovina", "code": "387", "iso": "BA", "flag":"🇧🇦" },
  { "country": "Botswana", "code": "267", "iso": "BW", "flag":"🇧🇼" },
  { "country": "Brazil", "code": "55", "iso": "BR", "flag":"🇧🇷" },
  { "country": "British Indian Ocean Territory", "code": "246", "iso": "IO", "flag":"🇮🇴" },
  { "country": "British Virgin Islands", "code": "1284", "iso": "VG", "flag":"🇻🇬" },
  { "country": "Brunei", "code": "673", "iso": "BN", "flag":"🇧🇳" },
  { "country": "Bulgaria", "code": "359", "iso": "BG", "flag":"🇧🇬" },
  { "country": "Burkina Faso", "code": "226", "iso": "BF", "flag":"🇧🇫" },
  { "country": "Burundi", "code": "257", "iso": "BI", "flag":"🇧🇮" },
  { "country": "Cambodia", "code": "855", "iso": "KH", "flag":"🇰🇭" },
  { "country": "Cameroon", "code": "237", "iso": "CM", "flag":"🇨🇲" },
  { "country": "Cape Verde", "code": "238", "iso": "CV", "flag":"🇨🇻" },
  { "country": "Cayman Islands", "code": "1345", "iso": "KY", "flag":"🇰🇾" },
  { "country": "Central African Republic", "code": "236", "iso": "CF", "flag":"🇨🇫" },
  { "country": "Chad", "code": "235", "iso": "TD", "flag":"🇹🇩" },
  { "country": "Chile", "code": "56", "iso": "CL", "flag":"🇨🇱" },
  { "country": "China", "code": "86", "iso": "CN", "flag":"🇨🇳" },
  { "country": "Christmas Island", "code": "61", "iso": "CX", "flag":"🇨🇽" },
  { "country": "Cocos Islands", "code": "61", "iso": "CC", "flag":"🇨🇨" },
  { "country": "Colombia", "code": "57", "iso": "CO", "flag":"🇨🇴" },
  { "country": "Comoros", "code": "269", "iso": "KM", "flag":"🇰🇲" },
  { "country": "Cook Islands", "code": "682", "iso": "CK", "flag":"🇨🇰" },
  { "country": "Costa Rica", "code": "506", "iso": "CR", "flag":"🇨🇷" },
  { "country": "Croatia", "code": "385", "iso": "HR", "flag":"🇭🇷" },
  { "country": "Cuba", "code": "53", "iso": "CU", "flag":"🇨🇺" },
  { "country": "Curacao", "code": "599", "iso": "CW", "flag":"🇨🇼" },
  { "country": "Cyprus", "code": "357", "iso": "CY", "flag":"🇨🇾" },
  { "country": "Czech Republic", "code": "420", "iso": "CZ", "flag":"🇨🇿" },
  { "country": "Democratic Republic of the Congo", "code": "243", "iso": "CD", "flag":"🇨🇩" },
  { "country": "Denmark", "code": "45", "iso": "DK", "flag":"🇩🇰" },
  { "country": "Djibouti", "code": "253", "iso": "DJ", "flag":"🇩🇯" },
  { "country": "Dominica", "code": "1767", "iso": "DM", "flag":"🇩🇲" },
  { "country": "Dominican Republic", "code": "1809", "iso": "DO", "flag":"🇩🇴" },
  { "country": "Dominican Republic", "code": "1829", "iso": "DO", "flag":"🇩🇴" },
  { "country": "Dominican Republic", "code": "1849", "iso": "DO", "flag":"🇩🇴" },
  { "country": "East Timor", "code": "670", "iso": "TL", "flag":"🇹🇱" },
  { "country": "Ecuador", "code": "593", "iso": "EC", "flag":"🇪🇨" },
  { "country": "Egypt", "code": "20", "iso": "EG", "flag":"🇪🇬" },
  { "country": "El Salvador", "code": "503", "iso": "SV", "flag":"🇸🇻" },
  { "country": "Equatorial Guinea", "code": "240", "iso": "GQ", "flag":"🇬🇶" },
  { "country": "Eritrea", "code": "291", "iso": "ER", "flag":"🇪🇷" },
  { "country": "Estonia", "code": "372", "iso": "EE", "flag":"🇪🇪" },
  { "country": "Ethiopia", "code": "251", "iso": "ET", "flag":"🇪🇹" },
  { "country": "Falkland Islands", "code": "500", "iso": "FK", "flag":"🇫🇰" },
  { "country": "Faroe Islands", "code": "298", "iso": "FO", "flag":"🇫🇴" },
  { "country": "Fiji", "code": "679", "iso": "FJ", "flag":"🇫🇯" },
  { "country": "Finland", "code": "358", "iso": "FI", "flag":"🇫🇮" },
  { "country": "France", "code": "33", "iso": "FR", "flag":"🇫🇷" },
  { "country": "French Polynesia", "code": "689", "iso": "PF", "flag":"🇵🇫" },
  { "country": "Gabon", "code": "241", "iso": "GA", "flag":"🇬🇦" },
  { "country": "Gambia", "code": "220", "iso": "GM", "flag":"🇬🇲" },
  { "country": "Georgia", "code": "995", "iso": "GE", "flag":"🇬🇪" },
  { "country": "Germany", "code": "49", "iso": "DE", "flag":"🇩🇪" },
  { "country": "Ghana", "code": "233", "iso": "GH", "flag":"🇬🇭" },
  { "country": "Gibraltar", "code": "350", "iso": "GI", "flag":"🇬🇮" },
  { "country": "Greece", "code": "30", "iso": "GR", "flag":"🇬🇷" },
  { "country": "Greenland", "code": "299", "iso": "GL", "flag":"🇬🇱" },
  { "country": "Grenada", "code": "1473", "iso": "GD", "flag":"🇬🇩" },
  { "country": "Guam", "code": "1671", "iso": "GU", "flag":"🇬🇺" },
  { "country": "Guatemala", "code": "502", "iso": "GT", "flag":"🇬🇹" },
  { "country": "Guernsey", "code": "441481", "iso": "GG", "flag":"🇬🇬" },
  { "country": "Guinea", "code": "224", "iso": "GN", "flag":"🇬🇳" },
  { "country": "Guinea-Bissau", "code": "245", "iso": "GW", "flag":"🇬🇼" },
  { "country": "Guyana", "code": "592", "iso": "GY", "flag":"🇬🇾" },
  { "country": "Haiti", "code": "509", "iso": "HT", "flag":"🇭🇹" },
  { "country": "Honduras", "code": "504", "iso": "HN", "flag":"🇭🇳" },
  { "country": "Hong Kong", "code": "852", "iso": "HK", "flag":"🇭🇰" },
  { "country": "Hungary", "code": "36", "iso": "HU", "flag":"🇭🇺" },
  { "country": "Iceland", "code": "354", "iso": "IS", "flag":"🇮🇸" },
  { "country": "India", "code": "91", "iso": "IN", "flag":"🇮🇳" },
  { "country": "Indonesia", "code": "62", "iso": "ID", "flag":"🇮🇩" },
  { "country": "Iran", "code": "98", "iso": "IR", "flag":"🇮🇷" },
  { "country": "Iraq", "code": "964", "iso": "IQ", "flag":"🇮🇶" },
  { "country": "Ireland", "code": "353", "iso": "IE", "flag":"🇮🇪" },
  { "country": "Isle of Man", "code": "441624", "iso": "IM", "flag":"🇮🇲" },
  { "country": "Israel", "code": "972", "iso": "IL", "flag":"🇮🇱" },
  { "country": "Italy", "code": "39", "iso": "IT", "flag":"🇮🇹" },
  { "country": "Ivory Coast", "code": "225", "iso": "CI", "flag":"🇨🇮" },
  { "country": "Jamaica", "code": "1876", "iso": "JM", "flag":"🇯🇲" },
  { "country": "Japan", "code": "81", "iso": "JP", "flag":"🇯🇵" },
  { "country": "Jersey", "code": "441534", "iso": "JE", "flag":"🇯🇪" },
  { "country": "Jordan", "code": "962", "iso": "JO", "flag":"🇯🇴" },
  { "country": "Kazakhstan", "code": "7", "iso": "KZ", "flag":"🇰🇿" },
  { "country": "Kenya", "code": "254", "iso": "KE", "flag":"🇰🇪" },
  { "country": "Kiribati", "code": "686", "iso": "KI", "flag":"🇰🇮" },
  { "country": "Kosovo", "code": "383", "iso": "XK", "flag":"🇽🇰" },
  { "country": "Kuwait", "code": "965", "iso": "KW", "flag":"🇰🇼" },
  { "country": "Kyrgyzstan", "code": "996", "iso": "KG", "flag":"🇰🇬" },
  { "country": "Laos", "code": "856", "iso": "LA", "flag":"🇱🇦" },
  { "country": "Latvia", "code": "371", "iso": "LV", "flag":"🇱🇻" },
  { "country": "Lebanon", "code": "961", "iso": "LB", "flag":"🇱🇧" },
  { "country": "Lesotho", "code": "266", "iso": "LS", "flag":"🇱🇸" },
  { "country": "Liberia", "code": "231", "iso": "LR", "flag":"🇱🇷" },
  { "country": "Libya", "code": "218", "iso": "LY", "flag":"🇱🇾" },
  { "country": "Liechtenstein", "code": "423", "iso": "LI", "flag":"🇱🇮" },
  { "country": "Lithuania", "code": "370", "iso": "LT", "flag":"🇱🇹" },
  { "country": "Luxembourg", "code": "352", "iso": "LU", "flag":"🇱🇺" },
  { "country": "Macao", "code": "853", "iso": "MO", "flag":"🇲🇴" },
  { "country": "Macedonia", "code": "389", "iso": "MK", "flag":"🇲🇰" },
  { "country": "Madagascar", "code": "261", "iso": "MG", "flag":"🇲🇬" },
  { "country": "Malawi", "code": "265", "iso": "MW", "flag":"🇲🇼" },
  { "country": "Malaysia", "code": "60", "iso": "MY", "flag":"🇲🇾" },
  { "country": "Maldives", "code": "960", "iso": "MV", "flag":"🇲🇻" },
  { "country": "Mali", "code": "223", "iso": "ML", "flag":"🇲🇱" },
  { "country": "Malta", "code": "356", "iso": "MT", "flag":"🇲🇹" },
  { "country": "Marshall Islands", "code": "692", "iso": "MH", "flag":"🇲🇭" },
  { "country": "Mauritania", "code": "222", "iso": "MR", "flag":"🇲🇷" },
  { "country": "Mauritius", "code": "230", "iso": "MU", "flag":"🇲🇺" },
  { "country": "Mayotte", "code": "262", "iso": "YT", "flag":"🇾🇹" },
  { "country": "Mexico", "code": "52", "iso": "MX", "flag":"🇲🇽" },
  { "country": "Micronesia", "code": "691", "iso": "FM", "flag":"🇫🇲" },
  { "country": "Moldova", "code": "373", "iso": "MD", "flag":"🇲🇩" },
  { "country": "Monaco", "code": "377", "iso": "MC", "flag":"🇲🇨" },
  { "country": "Mongolia", "code": "976", "iso": "MN", "flag":"🇲🇳" },
  { "country": "Montenegro", "code": "382", "iso": "ME", "flag":"🇲🇪" },
  { "country": "Montserrat", "code": "1664", "iso": "MS", "flag":"🇲🇸" },
  { "country": "Morocco", "code": "212", "iso": "MA", "flag":"🇲🇦" },
  { "country": "Mozambique", "code": "258", "iso": "MZ", "flag":"🇲🇿" },
  { "country": "Myanmar", "code": "95", "iso": "MM", "flag":"🇲🇲" },
  { "country": "Namibia", "code": "264", "iso": "NA", "flag":"🇳🇦" },
  { "country": "Nauru", "code": "674", "iso": "NR", "flag":"🇳🇷" },
  { "country": "Nepal", "code": "977", "iso": "NP", "flag":"🇳🇵" },
  { "country": "Netherlands", "code": "31", "iso": "NL", "flag":"🇳🇱" },
  { "country": "Netherlands Antilles", "code": "599", "iso": "AN", "flag":"🇳🇱" },
  { "country": "New Caledonia", "code": "687", "iso": "NC", "flag":"🇳🇨" },
  { "country": "New Zealand", "code": "64", "iso": "NZ", "flag":"🇳🇿" },
  { "country": "Nicaragua", "code": "505", "iso": "NI", "flag":"🇳🇮" },
  { "country": "Niger", "code": "227", "iso": "NE", "flag":"🇳🇪" },
  { "country": "Nigeria", "code": "234", "iso": "NG", "flag":"🇳🇬" },
  { "country": "Niue", "code": "683", "iso": "NU", "flag":"🇳🇺" },
  { "country": "North Korea", "code": "850", "iso": "KP", "flag":"🇰🇵" },
  { "country": "Northern Mariana Islands", "code": "1670", "iso": "MP", "flag":"🇲🇵" },
  { "country": "Norway", "code": "47", "iso": "NO", "flag":"🇳🇴" },
  { "country": "Oman", "code": "968", "iso": "OM", "flag":"🇴🇲" },
  { "country": "Pakistan", "code": "92", "iso": "PK", "flag":"🇵🇰" },
  { "country": "Palau", "code": "680", "iso": "PW", "flag":"🇵🇼" },
  { "country": "Palestine", "code": "970", "iso": "PS", "flag":"🇵🇸" },
  { "country": "Panama", "code": "507", "iso": "PA", "flag":"🇵🇦" },
  { "country": "Papua New Guinea", "code": "675", "iso": "PG", "flag":"🇵🇬" },
  { "country": "Paraguay", "code": "595", "iso": "PY", "flag":"🇵🇾" },
  { "country": "Peru", "code": "51", "iso": "PE", "flag":"🇵🇪" },
  { "country": "Philippines", "code": "63", "iso": "PH", "flag":"🇵🇭" },
  { "country": "Pitcairn", "code": "64", "iso": "PN", "flag":"🇵🇳" },
  { "country": "Poland", "code": "48", "iso": "PL", "flag":"🇵🇱" },
  { "country": "Portugal", "code": "351", "iso": "PT", "flag":"🇵🇹" },
  { "country": "Puerto Rico", "code": "1939", "iso": "PR", "flag":"🇵🇷" },
  { "country": "Puerto Rico", "code": "1787", "iso": "PR", "flag":"🇵🇷" },
  { "country": "Qatar", "code": "974", "iso": "QA", "flag":"🇶🇦" },
  { "country": "Republic of the Congo", "code": "242", "iso": "CG", "flag":"🇨🇬" },
  { "country": "Reunion", "code": "262", "iso": "RE", "flag":"🇷🇪" },
  { "country": "Romania", "code": "40", "iso": "RO", "flag":"🇷🇴" },
  { "country": "Russia", "code": "7", "iso": "RU", "flag":"🇷🇺" },
  { "country": "Rwanda", "code": "250", "iso": "RW", "flag":"🇷🇼" },
  { "country": "Saint Barthelemy", "code": "590", "iso": "BL", "flag":"🇧🇱" },
  { "country": "Saint Helena", "code": "290", "iso": "SH", "flag":"🇸🇭" },
  { "country": "Saint Kitts and Nevis", "code": "1869", "iso": "KN", "flag":"🇰🇳" },
  { "country": "Saint Lucia", "code": "1758", "iso": "LC", "flag":"🇱🇨" },
  { "country": "Saint Martin", "code": "590", "iso": "MF", "flag":"🇲🇫" },
  { "country": "Saint Pierre and Miquelon", "code": "508", "iso": "PM", "flag":"🇵🇲" },
  { "country": "Saint Vincent and the Grenadines", "code": "1784", "iso": "VC", "flag":"🇻🇨" },
  { "country": "Samoa", "code": "685", "iso": "WS", "flag":"🇼🇸" },
  { "country": "San Marino", "code": "378", "iso": "SM", "flag":"🇸🇲" },
  { "country": "Sao Tome and Principe", "code": "239", "iso": "ST", "flag":"🇸🇹" },
  { "country": "Saudi Arabia", "code": "966", "iso": "SA", "flag":"🇸🇦" },
  { "country": "Senegal", "code": "221", "iso": "SN", "flag":"🇸🇳" },
  { "country": "Serbia", "code": "381", "iso": "RS", "flag":"🇷🇸" },
  { "country": "Seychelles", "code": "248", "iso": "SC", "flag":"🇸🇨" },
  { "country": "Sierra Leone", "code": "232", "iso": "SL", "flag":"🇸🇱" },
  { "country": "Singapore", "code": "65", "iso": "SG", "flag":"🇸🇬" },
  { "country": "Sint Maarten", "code": "1721", "iso": "SX", "flag":"🇸🇽" },
  { "country": "Slovakia", "code": "421", "iso": "SK", "flag":"🇸🇰" },
  { "country": "Slovenia", "code": "386", "iso": "SI", "flag":"🇸🇮" },
  { "country": "Solomon Islands", "code": "677", "iso": "SB", "flag":"🇸🇧" },
  { "country": "Somalia", "code": "252", "iso": "SO", "flag":"🇸🇴" },
  { "country": "South Africa", "code": "27", "iso": "ZA", "flag":"🇿🇦" },
  { "country": "South Korea", "code": "82", "iso": "KR", "flag":"🇰🇷" },
  { "country": "South Sudan", "code": "211", "iso": "SS", "flag":"🇸🇸" },
  { "country": "Spain", "code": "34", "iso": "ES", "flag":"🇪🇸" },
  { "country": "Sri Lanka", "code": "94", "iso": "LK", "flag":"🇱🇰" },
  { "country": "Sudan", "code": "249", "iso": "SD", "flag":"🇸🇩" },
  { "country": "Suriname", "code": "597", "iso": "SR", "flag":"🇸🇷" },
  { "country": "Svalbard and Jan Mayen", "code": "47", "iso": "SJ", "flag":"🇸🇯" },
  { "country": "Swaziland", "code": "268", "iso": "SZ", "flag":"🇸🇿" },
  { "country": "Sweden", "code": "46", "iso": "SE", "flag":"🇸🇪" },
  { "country": "Switzerland", "code": "41", "iso": "CH", "flag":"🇨🇭" },
  { "country": "Syria", "code": "963", "iso": "SY", "flag":"🇸🇾" },
  { "country": "Taiwan", "code": "886", "iso": "TW", "flag":"🇹🇼" },
  { "country": "Tajikistan", "code": "992", "iso": "TJ", "flag":"🇹🇯" },
  { "country": "Tanzania", "code": "255", "iso": "TZ", "flag":"🇹🇿" },
  { "country": "Thailand", "code": "66", "iso": "TH", "flag":"🇹🇭" },
  { "country": "Togo", "code": "228", "iso": "TG", "flag":"🇹🇬" },
  { "country": "Tokelau", "code": "690", "iso": "TK", "flag":"🇹🇰" },
  { "country": "Tonga", "code": "676", "iso": "TO", "flag":"🇹🇴" },
  { "country": "Trinidad and Tobago", "code": "1868", "iso": "TT", "flag":"🇹🇹" },
  { "country": "Tunisia", "code": "216", "iso": "TN", "flag":"🇹🇳" },
  { "country": "Turkey", "code": "90", "iso": "TR", "flag":"🇹🇷" },
  { "country": "Turkmenistan", "code": "993", "iso": "TM", "flag":"🇹🇲" },
  { "country": "Turks and Caicos Islands", "code": "1649", "iso": "TC", "flag":"🇹🇨" },
  { "country": "Tuvalu", "code": "688", "iso": "TV", "flag":"🇹🇻" },
  { "country": "U.S. Virgin Islands", "code": "1340", "iso": "VI", "flag":"🇻🇮" },
  { "country": "Uganda", "code": "256", "iso": "UG", "flag":"🇺🇬" },
  { "country": "Ukraine", "code": "380", "iso": "UA", "flag":"🇺🇦" },
  { "country": "United Arab Emirates", "code": "971", "iso": "AE", "flag":"🇦🇪" },
  { "country": "Uruguay", "code": "598", "iso": "UY", "flag":"🇺🇾" },
  { "country": "Uzbekistan", "code": "998", "iso": "UZ", "flag":"🇺🇿" },
  { "country": "Vanuatu", "code": "678", "iso": "VU", "flag":"🇻🇺" },
  { "country": "Vatican", "code": "379", "iso": "VA", "flag":"🇻🇦" },
  { "country": "Venezuela", "code": "58", "iso": "VE", "flag":"🇻🇪" },
  { "country": "Vietnam", "code": "84", "iso": "VN", "flag":"🇻🇳" },
  { "country": "Wallis and Futuna", "code": "681", "iso": "WF", "flag":"🇼🇫" },
  { "country": "Western Sahara", "code": "212", "iso": "EH", "flag":"🇪🇭" },
  { "country": "Yemen", "code": "967", "iso": "YE", "flag":"🇾🇪" },
  { "country": "Zambia", "code": "260", "iso": "ZM", "flag":"🇿🇲" },
  { "country": "Zimbabwe", "code": "263", "iso": "ZW", "flag":"🇿🇼"}
  ]//.sort((a, b) => Number(a.code) - Number(b.code));
  
  export const stableCurrencies = [
    "USD", "EUR", "GBP", "CAD", "NGN"
  ]
  
  export const isoCountryCurrencies = [
    { "countryCode": "NG", "countryName": "Nigeria", "currencyCode": "NGN", "population": "154000000", "capital": "Abuja", "continentName": "Africa", "flag": "🇳🇬" },
    { "countryCode": "CA", "countryName": "Canada", "currencyCode": "CAD", "population": "33679000", "capital": "Ottawa", "continentName": "North America", "flag": "🇨🇦" },
    { "countryCode": "US", "countryName": "United States", "currencyCode": "USD", "population": "310232863", "capital": "Washington", "continentName": "North America", "flag": "🇺🇸" },
    { "countryCode": "GB", "countryName": "United Kingdom", "currencyCode": "GBP", "population": "62348447", "capital": "London", "continentName": "Europe", "flag": "🇬🇧" },
    { "countryCode": "FR", "countryName": "France", "currencyCode": "EUR", "population": "64768389", "capital": "Paris", "continentName": "Europe", "flag": "🇫🇷" },

    { "countryCode": "AD", "countryName": "Andorra", "currencyCode": "EUR", "population": "84000", "capital": "Andorra la Vella", "continentName": "Europe", "flag":"🇦🇩" },
    { "countryCode": "AE", "countryName": "United Arab Emirates", "currencyCode": "AED", "population": "4975593", "capital": "Abu Dhabi", "continentName": "Asia", "flag":"🇦🇪" },
    { "countryCode": "AF", "countryName": "Afghanistan", "currencyCode": "AFN", "population": "29121286", "capital": "Kabul", "continentName": "Asia", "flag":"🇦🇫" },
    { "countryCode": "AG", "countryName": "Antigua and Barbuda", "currencyCode": "XCD", "population": "86754", "capital": "St. John's", "continentName": "North America", "flag":"🇦🇬" },
    { "countryCode": "AI", "countryName": "Anguilla", "currencyCode": "XCD", "population": "13254", "capital": "The Valley", "continentName": "North America", "flag":"🇦🇮" },
    { "countryCode": "AL", "countryName": "Albania", "currencyCode": "ALL", "population": "2986952", "capital": "Tirana", "continentName": "Europe", "flag":"🇦🇱" },
    { "countryCode": "AM", "countryName": "Armenia", "currencyCode": "AMD", "population": "2968000", "capital": "Yerevan", "continentName": "Asia", "flag":"🇦🇲" },
    { "countryCode": "AO", "countryName": "Angola", "currencyCode": "AOA", "population": "13068161", "capital": "Luanda", "continentName": "Africa", "flag":"🇦🇴" },
    { "countryCode": "AQ", "countryName": "Antarctica", "currencyCode": "USD", "population": "0", "capital": "", "continentName": "Antarctica", "flag":"🇦🇶" },
    { "countryCode": "AR", "countryName": "Argentina", "currencyCode": "ARS", "population": "41343201", "capital": "Buenos Aires", "continentName": "South America", "flag":"🇦🇷" },
    { "countryCode": "AS", "countryName": "American Samoa", "currencyCode": "USD", "population": "57881", "capital": "Pago Pago", "continentName": "Oceania", "flag":"🇦🇸" },
    { "countryCode": "AT", "countryName": "Austria", "currencyCode": "EUR", "population": "8205000", "capital": "Vienna", "continentName": "Europe", "flag":"🇦🇹" },
    { "countryCode": "AU", "countryName": "Australia", "currencyCode": "AUD", "population": "21515754", "capital": "Canberra", "continentName": "Oceania", "flag":"🇦🇺" },
    { "countryCode": "AW", "countryName": "Aruba", "currencyCode": "AWG", "population": "71566", "capital": "Oranjestad", "continentName": "North America", "flag":"🇦🇼" },
    { "countryCode": "AX", "countryName": "Åland", "currencyCode": "EUR", "population": "26711", "capital": "Mariehamn", "continentName": "Europe", "flag":"🇦🇽" },
    { "countryCode": "AZ", "countryName": "Azerbaijan", "currencyCode": "AZN", "population": "8303512", "capital": "Baku", "continentName": "Asia", "flag":"🇦🇿" },
    { "countryCode": "BA", "countryName": "Bosnia and Herzegovina", "currencyCode": "BAM", "population": "4590000", "capital": "Sarajevo", "continentName": "Europe", "flag":"🇧🇦" },
    { "countryCode": "BB", "countryName": "Barbados", "currencyCode": "BBD", "population": "285653", "capital": "Bridgetown", "continentName": "North America", "flag":"🇧🇧" },
    { "countryCode": "BD", "countryName": "Bangladesh", "currencyCode": "BDT", "population": "156118464", "capital": "Dhaka", "continentName": "Asia", "flag":"🇧🇩" },
    { "countryCode": "BE", "countryName": "Belgium", "currencyCode": "EUR", "population": "10403000", "capital": "Brussels", "continentName": "Europe", "flag":"🇧🇪" },
    { "countryCode": "BF", "countryName": "Burkina Faso", "currencyCode": "XOF", "population": "16241811", "capital": "Ouagadougou", "continentName": "Africa", "flag":"🇧🇫" },
    { "countryCode": "BG", "countryName": "Bulgaria", "currencyCode": "BGN", "population": "7148785", "capital": "Sofia", "continentName": "Europe", "flag":"🇧🇬" },
    { "countryCode": "BH", "countryName": "Bahrain", "currencyCode": "BHD", "population": "738004", "capital": "Manama", "continentName": "Asia", "flag":"🇧🇭" },
    { "countryCode": "BI", "countryName": "Burundi", "currencyCode": "BIF", "population": "9863117", "capital": "Bujumbura", "continentName": "Africa", "flag":"🇧🇮" },
    { "countryCode": "BJ", "countryName": "Benin", "currencyCode": "XOF", "population": "9056010", "capital": "Porto-Novo", "continentName": "Africa", "flag":"🇧🇯" },
    { "countryCode": "BL", "countryName": "Saint Barthélemy", "currencyCode": "EUR", "population": "8450", "capital": "Gustavia", "continentName": "North America", "flag":"🇧🇱" },
    { "countryCode": "BM", "countryName": "Bermuda", "currencyCode": "BMD", "population": "65365", "capital": "Hamilton", "continentName": "North America", "flag":"🇧🇲" },
    { "countryCode": "BN", "countryName": "Brunei", "currencyCode": "BND", "population": "395027", "capital": "Bandar Seri Begawan", "continentName": "Asia", "flag":"🇧🇳" },
    { "countryCode": "BO", "countryName": "Bolivia", "currencyCode": "BOB", "population": "9947418", "capital": "Sucre", "continentName": "South America", "flag":"🇧🇴" },
    { "countryCode": "BQ", "countryName": "Bonaire", "currencyCode": "USD", "population": "18012", "capital": "Kralendijk", "continentName": "North America", "flag":"🇧🇶" },
    { "countryCode": "BR", "countryName": "Brazil", "currencyCode": "BRL", "population": "201103330", "capital": "Brasília", "continentName": "South America", "flag":"🇧🇷" },
    { "countryCode": "BS", "countryName": "Bahamas", "currencyCode": "BSD", "population": "301790", "capital": "Nassau", "continentName": "North America", "flag":"🇧🇸" },
    { "countryCode": "BT", "countryName": "Bhutan", "currencyCode": "BTN", "population": "699847", "capital": "Thimphu", "continentName": "Asia", "flag":"🇧🇹" },
    { "countryCode": "BV", "countryName": "Bouvet Island", "currencyCode": "NOK", "population": "0", "capital": "", "continentName": "Antarctica", "flag":"🇧🇻" },
    { "countryCode": "BW", "countryName": "Botswana", "currencyCode": "BWP", "population": "2029307", "capital": "Gaborone", "continentName": "Africa", "flag":"🇧🇼" },
    { "countryCode": "BY", "countryName": "Belarus", "currencyCode": "BYR", "population": "9685000", "capital": "Minsk", "continentName": "Europe", "flag":"🇧🇾" },
    { "countryCode": "BZ", "countryName": "Belize", "currencyCode": "BZD", "population": "314522", "capital": "Belmopan", "continentName": "North America", "flag":"🇧🇿" },
    
    { "countryCode": "CC", "countryName": "Cocos [Keeling] Islands", "currencyCode": "AUD", "population": "628", "capital": "West Island", "continentName": "Asia", "flag":"🇨🇨" },
    { "countryCode": "CD", "countryName": "Democratic Republic of the Congo", "currencyCode": "CDF", "population": "70916439", "capital": "Kinshasa", "continentName": "Africa", "flag":"🇨🇩" },
    { "countryCode": "CF", "countryName": "Central African Republic", "currencyCode": "XAF", "population": "4844927", "capital": "Bangui", "continentName": "Africa", "flag":"🇨🇫" },
    { "countryCode": "CG", "countryName": "Republic of the Congo", "currencyCode": "XAF", "population": "3039126", "capital": "Brazzaville", "continentName": "Africa", "flag":"🇨🇬" },
    { "countryCode": "CH", "countryName": "Switzerland", "currencyCode": "CHF", "population": "7581000", "capital": "Bern", "continentName": "Europe", "flag":"🇨🇭" },
    { "countryCode": "CI", "countryName": "Ivory Coast", "currencyCode": "XOF", "population": "21058798", "capital": "Yamoussoukro", "continentName": "Africa", "flag":"🇨🇮" },
    { "countryCode": "CK", "countryName": "Cook Islands", "currencyCode": "NZD", "population": "21388", "capital": "Avarua", "continentName": "Oceania", "flag":"🇨🇰" },
    { "countryCode": "CL", "countryName": "Chile", "currencyCode": "CLP", "population": "16746491", "capital": "Santiago", "continentName": "South America", "flag":"🇨🇱" },
    { "countryCode": "CM", "countryName": "Cameroon", "currencyCode": "XAF", "population": "19294149", "capital": "Yaoundé", "continentName": "Africa", "flag":"🇨🇲" },
    { "countryCode": "CN", "countryName": "China", "currencyCode": "CNY", "population": "1330044000", "capital": "Beijing", "continentName": "Asia", "flag":"🇨🇳" },
    { "countryCode": "CO", "countryName": "Colombia", "currencyCode": "COP", "population": "47790000", "capital": "Bogotá", "continentName": "South America", "flag":"🇨🇴" },
    { "countryCode": "CR", "countryName": "Costa Rica", "currencyCode": "CRC", "population": "4516220", "capital": "San José", "continentName": "North America", "flag":"🇨🇷" },
    { "countryCode": "CU", "countryName": "Cuba", "currencyCode": "CUP", "population": "11423000", "capital": "Havana", "continentName": "North America", "flag":"🇨🇺" },
    { "countryCode": "CV", "countryName": "Cape Verde", "currencyCode": "CVE", "population": "508659", "capital": "Praia", "continentName": "Africa", "flag":"🇨🇻" },
    { "countryCode": "CW", "countryName": "Curacao", "currencyCode": "ANG", "population": "141766", "capital": "Willemstad", "continentName": "North America", "flag":"🇨🇼" },
    { "countryCode": "CX", "countryName": "Christmas Island", "currencyCode": "AUD", "population": "1500", "capital": "Flying Fish Cove", "continentName": "Asia", "flag":"🇨🇽" },
    { "countryCode": "CY", "countryName": "Cyprus", "currencyCode": "EUR", "population": "1102677", "capital": "Nicosia", "continentName": "Europe", "flag":"🇨🇾" },
    { "countryCode": "CZ", "countryName": "Czechia", "currencyCode": "CZK", "population": "10476000", "capital": "Prague", "continentName": "Europe", "flag":"🇨🇿" },
    { "countryCode": "DE", "countryName": "Germany", "currencyCode": "EUR", "population": "81802257", "capital": "Berlin", "continentName": "Europe", "flag":"🇩🇪" },
    { "countryCode": "DJ", "countryName": "Djibouti", "currencyCode": "DJF", "population": "740528", "capital": "Djibouti", "continentName": "Africa", "flag":"🇩🇯" },
    { "countryCode": "DK", "countryName": "Denmark", "currencyCode": "DKK", "population": "5484000", "capital": "Copenhagen", "continentName": "Europe", "flag":"🇩🇰" },
    { "countryCode": "DM", "countryName": "Dominica", "currencyCode": "XCD", "population": "72813", "capital": "Roseau", "continentName": "North America", "flag":"🇩🇲" },
    { "countryCode": "DO", "countryName": "Dominican Republic", "currencyCode": "DOP", "population": "9823821", "capital": "Santo Domingo", "continentName": "North America", "flag":"🇩🇴" },
    { "countryCode": "DZ", "countryName": "Algeria", "currencyCode": "DZD", "population": "34586184", "capital": "Algiers", "continentName": "Africa", "flag":"🇩🇿" },
    { "countryCode": "EC", "countryName": "Ecuador", "currencyCode": "USD", "population": "14790608", "capital": "Quito", "continentName": "South America", "flag":"🇪🇨" },
    { "countryCode": "EE", "countryName": "Estonia", "currencyCode": "EUR", "population": "1291170", "capital": "Tallinn", "continentName": "Europe", "flag":"🇪🇪" },
    { "countryCode": "EG", "countryName": "Egypt", "currencyCode": "EGP", "population": "80471869", "capital": "Cairo", "continentName": "Africa", "flag":"🇪🇬" },
    { "countryCode": "EH", "countryName": "Western Sahara", "currencyCode": "MAD", "population": "273008", "capital": "Laâyoune / El Aaiún", "continentName": "Africa", "flag":"🇪🇭" },
    { "countryCode": "ER", "countryName": "Eritrea", "currencyCode": "ERN", "population": "5792984", "capital": "Asmara", "continentName": "Africa", "flag":"🇪🇷" },
    { "countryCode": "ES", "countryName": "Spain", "currencyCode": "EUR", "population": "46505963", "capital": "Madrid", "continentName": "Europe", "flag":"🇪🇸" },
    { "countryCode": "ET", "countryName": "Ethiopia", "currencyCode": "ETB", "population": "88013491", "capital": "Addis Ababa", "continentName": "Africa", "flag":"🇪🇹" },
    { "countryCode": "FI", "countryName": "Finland", "currencyCode": "EUR", "population": "5244000", "capital": "Helsinki", "continentName": "Europe", "flag":"🇫🇮" },
    { "countryCode": "FJ", "countryName": "Fiji", "currencyCode": "FJD", "population": "875983", "capital": "Suva", "continentName": "Oceania", "flag":"🇫🇯" },
    { "countryCode": "FK", "countryName": "Falkland Islands", "currencyCode": "FKP", "population": "2638", "capital": "Stanley", "continentName": "South America", "flag":"🇫🇰" },
    { "countryCode": "FM", "countryName": "Micronesia", "currencyCode": "USD", "population": "107708", "capital": "Palikir", "continentName": "Oceania", "flag":"🇫🇲" },
    { "countryCode": "FO", "countryName": "Faroe Islands", "currencyCode": "DKK", "population": "48228", "capital": "Tórshavn", "continentName": "Europe", "flag":"🇫🇴" },
    
    { "countryCode": "GA", "countryName": "Gabon", "currencyCode": "XAF", "population": "1545255", "capital": "Libreville", "continentName": "Africa", "flag":"🇬🇦" },
    
    { "countryCode": "GD", "countryName": "Grenada", "currencyCode": "XCD", "population": "107818", "capital": "St. George's", "continentName": "North America", "flag":"🇬🇩" },
    { "countryCode": "GE", "countryName": "Georgia", "currencyCode": "GEL", "population": "4630000", "capital": "Tbilisi", "continentName": "Asia", "flag":"🇬🇪" },
    { "countryCode": "GF", "countryName": "French Guiana", "currencyCode": "EUR", "population": "195506", "capital": "Cayenne", "continentName": "South America", "flag":"🇬🇫" },
    { "countryCode": "GG", "countryName": "Guernsey", "currencyCode": "GBP", "population": "65228", "capital": "St Peter Port", "continentName": "Europe", "flag":"🇬🇬" },
    { "countryCode": "GH", "countryName": "Ghana", "currencyCode": "GHS", "population": "24339838", "capital": "Accra", "continentName": "Africa", "flag":"🇬🇭" },
    { "countryCode": "GI", "countryName": "Gibraltar", "currencyCode": "GIP", "population": "27884", "capital": "Gibraltar", "continentName": "Europe", "flag":"🇬🇮" },
    { "countryCode": "GL", "countryName": "Greenland", "currencyCode": "DKK", "population": "56375", "capital": "Nuuk", "continentName": "North America", "flag":"🇬🇱" },
    { "countryCode": "GM", "countryName": "Gambia", "currencyCode": "GMD", "population": "1593256", "capital": "Bathurst", "continentName": "Africa", "flag":"🇬🇲" },
    { "countryCode": "GN", "countryName": "Guinea", "currencyCode": "GNF", "population": "10324025", "capital": "Conakry", "continentName": "Africa", "flag":"🇬🇳" },
    { "countryCode": "GP", "countryName": "Guadeloupe", "currencyCode": "EUR", "population": "443000", "capital": "Basse-Terre", "continentName": "North America", "flag":"🇬🇵" },
    { "countryCode": "GQ", "countryName": "Equatorial Guinea", "currencyCode": "XAF", "population": "1014999", "capital": "Malabo", "continentName": "Africa", "flag":"🇬🇶" },
    { "countryCode": "GR", "countryName": "Greece", "currencyCode": "EUR", "population": "11000000", "capital": "Athens", "continentName": "Europe", "flag":"🇬🇷" },
    { "countryCode": "GS", "countryName": "South Georgia and the South Sandwich Islands", "currencyCode": "GBP", "population": "30", "capital": "Grytviken", "continentName": "Antarctica", "flag":"🇬🇸" },
    { "countryCode": "GT", "countryName": "Guatemala", "currencyCode": "GTQ", "population": "13550440", "capital": "Guatemala City", "continentName": "North America", "flag":"🇬🇹" },
    { "countryCode": "GU", "countryName": "Guam", "currencyCode": "USD", "population": "159358", "capital": "Hagåtña", "continentName": "Oceania", "flag":"🇬🇺" },
    { "countryCode": "GW", "countryName": "Guinea-Bissau", "currencyCode": "XOF", "population": "1565126", "capital": "Bissau", "continentName": "Africa", "flag":"🇬🇼" },
    { "countryCode": "GY", "countryName": "Guyana", "currencyCode": "GYD", "population": "748486", "capital": "Georgetown", "continentName": "South America", "flag":"🇬🇾" },
    { "countryCode": "HK", "countryName": "Hong Kong", "currencyCode": "HKD", "population": "6898686", "capital": "Hong Kong", "continentName": "Asia", "flag":"🇭🇰" },
    { "countryCode": "HM", "countryName": "Heard Island and McDonald Islands", "currencyCode": "AUD", "population": "0", "capital": "", "continentName": "Antarctica", "flag":"🇭🇲" },
    { "countryCode": "HN", "countryName": "Honduras", "currencyCode": "HNL", "population": "7989415", "capital": "Tegucigalpa", "continentName": "North America", "flag":"🇭🇳" },
    { "countryCode": "HR", "countryName": "Croatia", "currencyCode": "HRK", "population": "4284889", "capital": "Zagreb", "continentName": "Europe", "flag":"🇭🇷" },
    { "countryCode": "HT", "countryName": "Haiti", "currencyCode": "HTG", "population": "9648924", "capital": "Port-au-Prince", "continentName": "North America", "flag":"🇭🇹" },
    { "countryCode": "HU", "countryName": "Hungary", "currencyCode": "HUF", "population": "9982000", "capital": "Budapest", "continentName": "Europe", "flag":"🇭🇺" },
    { "countryCode": "ID", "countryName": "Indonesia", "currencyCode": "IDR", "population": "242968342", "capital": "Jakarta", "continentName": "Asia", "flag":"🇮🇩" },
    { "countryCode": "IE", "countryName": "Ireland", "currencyCode": "EUR", "population": "4622917", "capital": "Dublin", "continentName": "Europe", "flag":"🇮🇪" },
    { "countryCode": "IL", "countryName": "Israel", "currencyCode": "ILS", "population": "7353985", "capital": "", "continentName": "Asia", "flag":"🇮🇱" },
    { "countryCode": "IM", "countryName": "Isle of Man", "currencyCode": "GBP", "population": "75049", "capital": "Douglas", "continentName": "Europe", "flag":"🇮🇲" },
    { "countryCode": "IN", "countryName": "India", "currencyCode": "INR", "population": "1173108018", "capital": "New Delhi", "continentName": "Asia", "flag":"🇮🇳" },
    { "countryCode": "IO", "countryName": "British Indian Ocean Territory", "currencyCode": "USD", "population": "4000", "capital": "", "continentName": "Asia", "flag":"🇮🇴" },
    { "countryCode": "IQ", "countryName": "Iraq", "currencyCode": "IQD", "population": "29671605", "capital": "Baghdad", "continentName": "Asia", "flag":"🇮🇶" },
    { "countryCode": "IR", "countryName": "Iran", "currencyCode": "IRR", "population": "76923300", "capital": "Tehran", "continentName": "Asia", "flag":"🇮🇷" },
    { "countryCode": "IS", "countryName": "Iceland", "currencyCode": "ISK", "population": "308910", "capital": "Reykjavik", "continentName": "Europe", "flag":"🇮🇸" },
    { "countryCode": "IT", "countryName": "Italy", "currencyCode": "EUR", "population": "60340328", "capital": "Rome", "continentName": "Europe", "flag":"🇮🇹" },
    { "countryCode": "JE", "countryName": "Jersey", "currencyCode": "GBP", "population": "90812", "capital": "Saint Helier", "continentName": "Europe", "flag":"🇯🇪" },
    { "countryCode": "JM", "countryName": "Jamaica", "currencyCode": "JMD", "population": "2847232", "capital": "Kingston", "continentName": "North America", "flag":"🇯🇲" },
    { "countryCode": "JO", "countryName": "Jordan", "currencyCode": "JOD", "population": "6407085", "capital": "Amman", "continentName": "Asia", "flag":"🇯🇴" },
    { "countryCode": "JP", "countryName": "Japan", "currencyCode": "JPY", "population": "127288000", "capital": "Tokyo", "continentName": "Asia", "flag":"🇯🇵" },
    { "countryCode": "KE", "countryName": "Kenya", "currencyCode": "KES", "population": "40046566", "capital": "Nairobi", "continentName": "Africa", "flag":"🇰🇪" },
    { "countryCode": "KG", "countryName": "Kyrgyzstan", "currencyCode": "KGS", "population": "5776500", "capital": "Bishkek", "continentName": "Asia", "flag":"🇰🇬" },
    { "countryCode": "KH", "countryName": "Cambodia", "currencyCode": "KHR", "population": "14453680", "capital": "Phnom Penh", "continentName": "Asia", "flag":"🇰🇭" },
    { "countryCode": "KI", "countryName": "Kiribati", "currencyCode": "AUD", "population": "92533", "capital": "Tarawa", "continentName": "Oceania", "flag":"🇰🇮" },
    { "countryCode": "KM", "countryName": "Comoros", "currencyCode": "KMF", "population": "773407", "capital": "Moroni", "continentName": "Africa", "flag":"🇰🇲" },
    { "countryCode": "KN", "countryName": "Saint Kitts and Nevis", "currencyCode": "XCD", "population": "51134", "capital": "Basseterre", "continentName": "North America", "flag":"🇰🇳" },
    { "countryCode": "KP", "countryName": "North Korea", "currencyCode": "KPW", "population": "22912177", "capital": "Pyongyang", "continentName": "Asia", "flag":"🇰🇵" },
    { "countryCode": "KR", "countryName": "South Korea", "currencyCode": "KRW", "population": "48422644", "capital": "Seoul", "continentName": "Asia", "flag":"🇰🇷" },
    { "countryCode": "KW", "countryName": "Kuwait", "currencyCode": "KWD", "population": "2789132", "capital": "Kuwait City", "continentName": "Asia", "flag":"🇰🇼" },
    { "countryCode": "KY", "countryName": "Cayman Islands", "currencyCode": "KYD", "population": "44270", "capital": "George Town", "continentName": "North America", "flag":"🇰🇾" },
    { "countryCode": "KZ", "countryName": "Kazakhstan", "currencyCode": "KZT", "population": "15340000", "capital": "Astana", "continentName": "Asia", "flag":"🇰🇿" },
    { "countryCode": "LA", "countryName": "Laos", "currencyCode": "LAK", "population": "6368162", "capital": "Vientiane", "continentName": "Asia", "flag":"🇱🇦" },
    { "countryCode": "LB", "countryName": "Lebanon", "currencyCode": "LBP", "population": "4125247", "capital": "Beirut", "continentName": "Asia", "flag":"🇱🇧" },
    { "countryCode": "LC", "countryName": "Saint Lucia", "currencyCode": "XCD", "population": "160922", "capital": "Castries", "continentName": "North America", "flag":"🇱🇨" },
    { "countryCode": "LI", "countryName": "Liechtenstein", "currencyCode": "CHF", "population": "35000", "capital": "Vaduz", "continentName": "Europe", "flag":"🇱🇮" },
    { "countryCode": "LK", "countryName": "Sri Lanka", "currencyCode": "LKR", "population": "21513990", "capital": "Colombo", "continentName": "Asia", "flag":"🇱🇰" },
    { "countryCode": "LR", "countryName": "Liberia", "currencyCode": "LRD", "population": "3685076", "capital": "Monrovia", "continentName": "Africa", "flag":"🇱🇷" },
    { "countryCode": "LS", "countryName": "Lesotho", "currencyCode": "LSL", "population": "1919552", "capital": "Maseru", "continentName": "Africa", "flag":"🇱🇸" },
    { "countryCode": "LT", "countryName": "Lithuania", "currencyCode": "EUR", "population": "2944459", "capital": "Vilnius", "continentName": "Europe", "flag":"🇱🇹" },
    { "countryCode": "LU", "countryName": "Luxembourg", "currencyCode": "EUR", "population": "497538", "capital": "Luxembourg", "continentName": "Europe", "flag":"🇱🇺" },
    { "countryCode": "LV", "countryName": "Latvia", "currencyCode": "EUR", "population": "2217969", "capital": "Riga", "continentName": "Europe", "flag":"🇱🇻" },
    { "countryCode": "LY", "countryName": "Libya", "currencyCode": "LYD", "population": "6461454", "capital": "Tripoli", "continentName": "Africa", "flag":"🇱🇾" },
    { "countryCode": "MA", "countryName": "Morocco", "currencyCode": "MAD", "population": "33848242", "capital": "Rabat", "continentName": "Africa", "flag":"🇲🇦" },
    { "countryCode": "MC", "countryName": "Monaco", "currencyCode": "EUR", "population": "32965", "capital": "Monaco", "continentName": "Europe", "flag":"🇲🇨" },
    { "countryCode": "MD", "countryName": "Moldova", "currencyCode": "MDL", "population": "4324000", "capital": "Chişinău", "continentName": "Europe", "flag":"🇲🇩" },
    { "countryCode": "ME", "countryName": "Montenegro", "currencyCode": "EUR", "population": "666730", "capital": "Podgorica", "continentName": "Europe", "flag":"🇲🇪" },
    { "countryCode": "MF", "countryName": "Saint Martin", "currencyCode": "EUR", "population": "35925", "capital": "Marigot", "continentName": "North America", "flag":"🇲🇫" },
    { "countryCode": "MG", "countryName": "Madagascar", "currencyCode": "MGA", "population": "21281844", "capital": "Antananarivo", "continentName": "Africa", "flag":"🇲🇬" },
    { "countryCode": "MH", "countryName": "Marshall Islands", "currencyCode": "USD", "population": "65859", "capital": "Majuro", "continentName": "Oceania", "flag":"🇲🇭" },
    { "countryCode": "MK", "countryName": "Macedonia", "currencyCode": "MKD", "population": "2062294", "capital": "Skopje", "continentName": "Europe", "flag":"🇲🇰" },
    { "countryCode": "ML", "countryName": "Mali", "currencyCode": "XOF", "population": "13796354", "capital": "Bamako", "continentName": "Africa", "flag":"🇲🇱" },
    { "countryCode": "MM", "countryName": "Myanmar [Burma]", "currencyCode": "MMK", "population": "53414374", "capital": "Naypyitaw", "continentName": "Asia", "flag":"🇲🇲" },
    { "countryCode": "MN", "countryName": "Mongolia", "currencyCode": "MNT", "population": "3086918", "capital": "Ulan Bator", "continentName": "Asia", "flag":"🇲🇳" },
    { "countryCode": "MO", "countryName": "Macao", "currencyCode": "MOP", "population": "449198", "capital": "Macao", "continentName": "Asia", "flag":"🇲🇴" },
    { "countryCode": "MP", "countryName": "Northern Mariana Islands", "currencyCode": "USD", "population": "53883", "capital": "Saipan", "continentName": "Oceania", "flag":"🇲🇵" },
    { "countryCode": "MQ", "countryName": "Martinique", "currencyCode": "EUR", "population": "432900", "capital": "Fort-de-France", "continentName": "North America", "flag":"🇲🇶" },
    { "countryCode": "MR", "countryName": "Mauritania", "currencyCode": "MRO", "population": "3205060", "capital": "Nouakchott", "continentName": "Africa", "flag":"🇲🇷" },
    { "countryCode": "MS", "countryName": "Montserrat", "currencyCode": "XCD", "population": "9341", "capital": "Plymouth", "continentName": "North America", "flag":"🇲🇸" },
    { "countryCode": "MT", "countryName": "Malta", "currencyCode": "EUR", "population": "403000", "capital": "Valletta", "continentName": "Europe", "flag":"🇲🇹" },
    { "countryCode": "MU", "countryName": "Mauritius", "currencyCode": "MUR", "population": "1294104", "capital": "Port Louis", "continentName": "Africa", "flag":"🇲🇺" },
    { "countryCode": "MV", "countryName": "Maldives", "currencyCode": "MVR", "population": "395650", "capital": "Malé", "continentName": "Asia", "flag":"🇲🇻" },
    { "countryCode": "MW", "countryName": "Malawi", "currencyCode": "MWK", "population": "15447500", "capital": "Lilongwe", "continentName": "Africa", "flag":"🇲🇼" },
    { "countryCode": "MX", "countryName": "Mexico", "currencyCode": "MXN", "population": "112468855", "capital": "Mexico City", "continentName": "North America", "flag":"🇲🇽" },
    { "countryCode": "MY", "countryName": "Malaysia", "currencyCode": "MYR", "population": "28274729", "capital": "Kuala Lumpur", "continentName": "Asia", "flag":"🇲🇾" },
    { "countryCode": "MZ", "countryName": "Mozambique", "currencyCode": "MZN", "population": "22061451", "capital": "Maputo", "continentName": "Africa", "flag":"🇲🇿" },
    { "countryCode": "NA", "countryName": "Namibia", "currencyCode": "NAD", "population": "2128471", "capital": "Windhoek", "continentName": "Africa", "flag":"🇳🇦" },
    { "countryCode": "NC", "countryName": "New Caledonia", "currencyCode": "XPF", "population": "216494", "capital": "Noumea", "continentName": "Oceania", "flag":"🇳🇨" },
    { "countryCode": "NE", "countryName": "Niger", "currencyCode": "XOF", "population": "15878271", "capital": "Niamey", "continentName": "Africa", "flag":"🇳🇪" },
    { "countryCode": "NF", "countryName": "Norfolk Island", "currencyCode": "AUD", "population": "1828", "capital": "Kingston", "continentName": "Oceania", "flag":"🇳🇫" },
    
    { "countryCode": "NI", "countryName": "Nicaragua", "currencyCode": "NIO", "population": "5995928", "capital": "Managua", "continentName": "North America", "flag":"🇳🇮" },
    { "countryCode": "NL", "countryName": "Netherlands", "currencyCode": "EUR", "population": "16645000", "capital": "Amsterdam", "continentName": "Europe", "flag":"🇳🇱" },
    { "countryCode": "NO", "countryName": "Norway", "currencyCode": "NOK", "population": "5009150", "capital": "Oslo", "continentName": "Europe", "flag":"🇳🇴" },
    { "countryCode": "NP", "countryName": "Nepal", "currencyCode": "NPR", "population": "28951852", "capital": "Kathmandu", "continentName": "Asia", "flag":"🇳🇵" },
    { "countryCode": "NR", "countryName": "Nauru", "currencyCode": "AUD", "population": "10065", "capital": "Yaren", "continentName": "Oceania", "flag":"🇳🇷" },
    { "countryCode": "NU", "countryName": "Niue", "currencyCode": "NZD", "population": "2166", "capital": "Alofi", "continentName": "Oceania", "flag":"🇳🇺" },
    { "countryCode": "NZ", "countryName": "New Zealand", "currencyCode": "NZD", "population": "4252277", "capital": "Wellington", "continentName": "Oceania", "flag":"🇳🇿" },
    { "countryCode": "OM", "countryName": "Oman", "currencyCode": "OMR", "population": "2967717", "capital": "Muscat", "continentName": "Asia", "flag":"🇴🇲" },
    { "countryCode": "PA", "countryName": "Panama", "currencyCode": "PAB", "population": "3410676", "capital": "Panama City", "continentName": "North America", "flag":"🇵🇦" },
    { "countryCode": "PE", "countryName": "Peru", "currencyCode": "PEN", "population": "29907003", "capital": "Lima", "continentName": "South America", "flag":"🇵🇪" },
    { "countryCode": "PF", "countryName": "French Polynesia", "currencyCode": "XPF", "population": "270485", "capital": "Papeete", "continentName": "Oceania", "flag":"🇵🇫" },
    { "countryCode": "PG", "countryName": "Papua New Guinea", "currencyCode": "PGK", "population": "6064515", "capital": "Port Moresby", "continentName": "Oceania", "flag":"🇵🇬" },
    { "countryCode": "PH", "countryName": "Philippines", "currencyCode": "PHP", "population": "99900177", "capital": "Manila", "continentName": "Asia", "flag":"🇵🇭" },
    { "countryCode": "PK", "countryName": "Pakistan", "currencyCode": "PKR", "population": "184404791", "capital": "Islamabad", "continentName": "Asia", "flag":"🇵🇰" },
    { "countryCode": "PL", "countryName": "Poland", "currencyCode": "PLN", "population": "38500000", "capital": "Warsaw", "continentName": "Europe", "flag":"🇵🇱" },
    { "countryCode": "PM", "countryName": "Saint Pierre and Miquelon", "currencyCode": "EUR", "population": "7012", "capital": "Saint-Pierre", "continentName": "North America", "flag":"🇵🇲" },
    { "countryCode": "PN", "countryName": "Pitcairn Islands", "currencyCode": "NZD", "population": "46", "capital": "Adamstown", "continentName": "Oceania", "flag":"🇵🇳" },
    { "countryCode": "PR", "countryName": "Puerto Rico", "currencyCode": "USD", "population": "3916632", "capital": "San Juan", "continentName": "North America", "flag":"🇵🇷" },
    { "countryCode": "PS", "countryName": "Palestine", "currencyCode": "ILS", "population": "3800000", "capital": "", "continentName": "Asia", "flag":"🇵🇸" },
    { "countryCode": "PT", "countryName": "Portugal", "currencyCode": "EUR", "population": "10676000", "capital": "Lisbon", "continentName": "Europe", "flag":"🇵🇹" },
    { "countryCode": "PW", "countryName": "Palau", "currencyCode": "USD", "population": "19907", "capital": "Melekeok", "continentName": "Oceania", "flag":"🇵🇼" },
    { "countryCode": "PY", "countryName": "Paraguay", "currencyCode": "PYG", "population": "6375830", "capital": "Asunción", "continentName": "South America", "flag":"🇵🇾" },
    { "countryCode": "QA", "countryName": "Qatar", "currencyCode": "QAR", "population": "840926", "capital": "Doha", "continentName": "Asia", "flag":"🇶🇦" },
    { "countryCode": "RE", "countryName": "Réunion", "currencyCode": "EUR", "population": "776948", "capital": "Saint-Denis", "continentName": "Africa", "flag":"🇷🇪" },
    { "countryCode": "RO", "countryName": "Romania", "currencyCode": "RON", "population": "21959278", "capital": "Bucharest", "continentName": "Europe", "flag":"🇷🇴" },
    { "countryCode": "RS", "countryName": "Serbia", "currencyCode": "RSD", "population": "7344847", "capital": "Belgrade", "continentName": "Europe", "flag":"🇷🇸" },
    { "countryCode": "RU", "countryName": "Russia", "currencyCode": "RUB", "population": "140702000", "capital": "Moscow", "continentName": "Europe", "flag":"🇷🇺" },
    { "countryCode": "RW", "countryName": "Rwanda", "currencyCode": "RWF", "population": "11055976", "capital": "Kigali", "continentName": "Africa", "flag":"🇷🇼" },
    { "countryCode": "SA", "countryName": "Saudi Arabia", "currencyCode": "SAR", "population": "25731776", "capital": "Riyadh", "continentName": "Asia", "flag":"🇸🇦" },
    { "countryCode": "SB", "countryName": "Solomon Islands", "currencyCode": "SBD", "population": "559198", "capital": "Honiara", "continentName": "Oceania", "flag":"🇸🇧" },
    { "countryCode": "SC", "countryName": "Seychelles", "currencyCode": "SCR", "population": "88340", "capital": "Victoria", "continentName": "Africa", "flag":"🇸🇨" },
    { "countryCode": "SD", "countryName": "Sudan", "currencyCode": "SDG", "population": "35000000", "capital": "Khartoum", "continentName": "Africa", "flag":"🇸🇩" },
    { "countryCode": "SE", "countryName": "Sweden", "currencyCode": "SEK", "population": "9828655", "capital": "Stockholm", "continentName": "Europe", "flag":"🇸🇪" },
    { "countryCode": "SG", "countryName": "Singapore", "currencyCode": "SGD", "population": "4701069", "capital": "Singapore", "continentName": "Asia", "flag":"🇸🇬" },
    { "countryCode": "SH", "countryName": "Saint Helena", "currencyCode": "SHP", "population": "7460", "capital": "Jamestown", "continentName": "Africa", "flag":"🇸🇭" },
    { "countryCode": "SI", "countryName": "Slovenia", "currencyCode": "EUR", "population": "2007000", "capital": "Ljubljana", "continentName": "Europe", "flag":"🇸🇮" },
    { "countryCode": "SJ", "countryName": "Svalbard and Jan Mayen", "currencyCode": "NOK", "population": "2550", "capital": "Longyearbyen", "continentName": "Europe", "flag":"🇸🇯" },
    { "countryCode": "SK", "countryName": "Slovakia", "currencyCode": "EUR", "population": "5455000", "capital": "Bratislava", "continentName": "Europe", "flag":"🇸🇰" },
    { "countryCode": "SL", "countryName": "Sierra Leone", "currencyCode": "SLL", "population": "5245695", "capital": "Freetown", "continentName": "Africa", "flag":"🇸🇱" },
    { "countryCode": "SM", "countryName": "San Marino", "currencyCode": "EUR", "population": "31477", "capital": "San Marino", "continentName": "Europe", "flag":"🇸🇲" },
    { "countryCode": "SN", "countryName": "Senegal", "currencyCode": "XOF", "population": "12323252", "capital": "Dakar", "continentName": "Africa", "flag":"🇸🇳" },
    { "countryCode": "SO", "countryName": "Somalia", "currencyCode": "SOS", "population": "10112453", "capital": "Mogadishu", "continentName": "Africa", "flag":"🇸🇴" },
    { "countryCode": "SR", "countryName": "Suriname", "currencyCode": "SRD", "population": "492829", "capital": "Paramaribo", "continentName": "South America", "flag":"🇸🇷" },
    { "countryCode": "SS", "countryName": "South Sudan", "currencyCode": "SSP", "population": "8260490", "capital": "Juba", "continentName": "Africa", "flag":"🇸🇸" },
    { "countryCode": "ST", "countryName": "São Tomé and Príncipe", "currencyCode": "STD", "population": "175808", "capital": "São Tomé", "continentName": "Africa", "flag":"🇸🇹" },
    { "countryCode": "SV", "countryName": "El Salvador", "currencyCode": "USD", "population": "6052064", "capital": "San Salvador", "continentName": "North America", "flag":"🇸🇻" },
    { "countryCode": "SX", "countryName": "Sint Maarten", "currencyCode": "ANG", "population": "37429", "capital": "Philipsburg", "continentName": "North America", "flag":"🇸🇽" },
    { "countryCode": "SY", "countryName": "Syria", "currencyCode": "SYP", "population": "22198110", "capital": "Damascus", "continentName": "Asia", "flag":"🇸🇾" },
    { "countryCode": "SZ", "countryName": "Swaziland", "currencyCode": "SZL", "population": "1354051", "capital": "Mbabane", "continentName": "Africa", "flag":"🇸🇿" },
    { "countryCode": "TC", "countryName": "Turks and Caicos Islands", "currencyCode": "USD", "population": "20556", "capital": "Cockburn Town", "continentName": "North America", "flag":"🇹🇨" },
    { "countryCode": "TD", "countryName": "Chad", "currencyCode": "XAF", "population": "10543464", "capital": "N'Djamena", "continentName": "Africa", "flag":"🇹🇩" },
    { "countryCode": "TF", "countryName": "French Southern Territories", "currencyCode": "EUR", "population": "140", "capital": "Port-aux-Français", "continentName": "Antarctica", "flag":"🇹🇫" },
    { "countryCode": "TG", "countryName": "Togo", "currencyCode": "XOF", "population": "6587239", "capital": "Lomé", "continentName": "Africa", "flag":"🇹🇬" },
    { "countryCode": "TH", "countryName": "Thailand", "currencyCode": "THB", "population": "67089500", "capital": "Bangkok", "continentName": "Asia", "flag":"🇹🇭" },
    { "countryCode": "TJ", "countryName": "Tajikistan", "currencyCode": "TJS", "population": "7487489", "capital": "Dushanbe", "continentName": "Asia", "flag":"🇹🇯" },
    { "countryCode": "TK", "countryName": "Tokelau", "currencyCode": "NZD", "population": "1466", "capital": "", "continentName": "Oceania", "flag":"🇹🇰" },
    { "countryCode": "TL", "countryName": "East Timor", "currencyCode": "USD", "population": "1154625", "capital": "Dili", "continentName": "Oceania", "flag":"🇹🇱" },
    { "countryCode": "TM", "countryName": "Turkmenistan", "currencyCode": "TMT", "population": "4940916", "capital": "Ashgabat", "continentName": "Asia", "flag":"🇹🇲" },
    { "countryCode": "TN", "countryName": "Tunisia", "currencyCode": "TND", "population": "10589025", "capital": "Tunis", "continentName": "Africa", "flag":"🇹🇳" },
    { "countryCode": "TO", "countryName": "Tonga", "currencyCode": "TOP", "population": "122580", "capital": "Nuku'alofa", "continentName": "Oceania", "flag":"🇹🇴" },
    { "countryCode": "TR", "countryName": "Turkey", "currencyCode": "TRY", "population": "77804122", "capital": "Ankara", "continentName": "Asia", "flag":"🇹🇷" },
    { "countryCode": "TT", "countryName": "Trinidad and Tobago", "currencyCode": "TTD", "population": "1228691", "capital": "Port of Spain", "continentName": "North America", "flag":"🇹🇹" },
    { "countryCode": "TV", "countryName": "Tuvalu", "currencyCode": "AUD", "population": "10472", "capital": "Funafuti", "continentName": "Oceania", "flag":"🇹🇻" },
    { "countryCode": "TW", "countryName": "Taiwan", "currencyCode": "TWD", "population": "22894384", "capital": "Taipei", "continentName": "Asia", "flag":"🇹🇼" },
    { "countryCode": "TZ", "countryName": "Tanzania", "currencyCode": "TZS", "population": "41892895", "capital": "Dodoma", "continentName": "Africa", "flag":"🇹🇿" },
    { "countryCode": "UA", "countryName": "Ukraine", "currencyCode": "UAH", "population": "45415596", "capital": "Kiev", "continentName": "Europe", "flag":"🇺🇦" },
    { "countryCode": "UG", "countryName": "Uganda", "currencyCode": "UGX", "population": "33398682", "capital": "Kampala", "continentName": "Africa", "flag":"🇺🇬" },
    { "countryCode": "UM", "countryName": "U.S. Minor Outlying Islands", "currencyCode": "USD", "population": "0", "capital": "", "continentName": "Oceania", "flag":"🇺🇲" },
    
    { "countryCode": "UY", "countryName": "Uruguay", "currencyCode": "UYU", "population": "3477000", "capital": "Montevideo", "continentName": "South America", "flag":"🇺🇾" },
    { "countryCode": "UZ", "countryName": "Uzbekistan", "currencyCode": "UZS", "population": "27865738", "capital": "Tashkent", "continentName": "Asia", "flag":"🇺🇿" },
    { "countryCode": "VA", "countryName": "Vatican City", "currencyCode": "EUR", "population": "921", "capital": "Vatican City", "continentName": "Europe", "flag":"🇻🇦" },
    { "countryCode": "VC", "countryName": "Saint Vincent and the Grenadines", "currencyCode": "XCD", "population": "104217", "capital": "Kingstown", "continentName": "North America", "flag":"🇻🇨" },
    { "countryCode": "VE", "countryName": "Venezuela", "currencyCode": "VEF", "population": "27223228", "capital": "Caracas", "continentName": "South America", "flag":"🇻🇪" },
    { "countryCode": "VG", "countryName": "British Virgin Islands", "currencyCode": "USD", "population": "21730", "capital": "Road Town", "continentName": "North America", "flag":"🇻🇬" },
    { "countryCode": "VI", "countryName": "U.S. Virgin Islands", "currencyCode": "USD", "population": "108708", "capital": "Charlotte Amalie", "continentName": "North America", "flag":"🇻🇮" },
    { "countryCode": "VN", "countryName": "Vietnam", "currencyCode": "VND", "population": "89571130", "capital": "Hanoi", "continentName": "Asia", "flag":"🇻🇳" },
    { "countryCode": "VU", "countryName": "Vanuatu", "currencyCode": "VUV", "population": "221552", "capital": "Port Vila", "continentName": "Oceania", "flag":"🇻🇺" },
    { "countryCode": "WF", "countryName": "Wallis and Futuna", "currencyCode": "XPF", "population": "16025", "capital": "Mata-Utu", "continentName": "Oceania", "flag":"🇼🇫" },
    { "countryCode": "WS", "countryName": "Samoa", "currencyCode": "WST", "population": "192001", "capital": "Apia", "continentName": "Oceania", "flag":"🇼🇸" },
    { "countryCode": "XK", "countryName": "Kosovo", "currencyCode": "EUR", "population": "1800000", "capital": "Pristina", "continentName": "Europe", "flag":"🇽🇰" },
    { "countryCode": "YE", "countryName": "Yemen", "currencyCode": "YER", "population": "23495361", "capital": "Sanaa", "continentName": "Asia", "flag":"🇾🇪" },
    { "countryCode": "YT", "countryName": "Mayotte", "currencyCode": "EUR", "population": "159042", "capital": "Mamoudzou", "continentName": "Africa", "flag":"🇾🇹" },
    { "countryCode": "ZA", "countryName": "South Africa", "currencyCode": "ZAR", "population": "49000000", "capital": "Pretoria", "continentName": "Africa", "flag":"🇿🇦" },
    { "countryCode": "ZM", "countryName": "Zambia", "currencyCode": "ZMW", "population": "13460305", "capital": "Lusaka", "continentName": "Africa", "flag":"🇿🇲" },
    { "countryCode": "ZW", "countryName": "Zimbabwe", "currencyCode": "ZWL", "population": "13061000", "capital": "Harare", "continentName": "Africa", "flag":"🇿🇼" }
  ]

export const uniqueCurrencies = Object.values(
  isoCountryCurrencies.reduce((acc, obj) => ({ ...acc, [obj.currencyCode]: obj }), {})
);
