import fs from "fs";

const weapons = [
  "m4a1",
  "m4a1_silencer",
  "ak47",
  "aug",
  "sg556",
  "awp",
  "ssg08",
  "scar20",
  "gs3sg1",
  "famas",
  "galil",
  "bizon",
  "mac10",
  "mp9",
  "mp7",
  "p90",
  "ump45",
  "mp5sd",
  "m249",
  "mag7",
  "negev",
  "nova",
  "sawedoff",
  "xm1014",
  "usp_silencer",
  "deagle",
  "elite",
  "fiveseven",
  "glock",
  "hkp2000",
  "p250",
  "tec9",
  "revolver",
  "cz75a",
];

weapons.sort(function () {
  return Math.random() - 0.5;
});

var content = `"${weapons[0]}" { "kills" "10" }\n"${weapons[1]}" { "kills" "2" }\n"${weapons[2]}" { "kills" "2" }\n"${weapons[3]}" { "kills" "2" }\n"${weapons[4]}" { "kills" "2" }\n"${weapons[5]}" { "kills" "2" }\n"${weapons[6]}" { "kills" "2" }\n"${weapons[7]}" { "kills" "2" }\n"${weapons[8]}" { "kills" "2" }\n"${weapons[9]}" { "kills" "2" }\n"${weapons[10]}" { "kills" "2" }\n"${weapons[11]}" { "kills" "2" }\n"${weapons[12]}" { "kills" "2" }\n"${weapons[13]}" { "kills" "2" }\n"${weapons[14]}" { "kills" "2" }\n"${weapons[15]}" { "kills" "2" }\n"${weapons[16]}" { "kills" "2" }\n"${weapons[17]}" { "kills" "2" }\n"${weapons[18]}" { "kills" "2" }\n"${weapons[19]}" { "kills" "2" }\n"${weapons[20]}" { "kills" "2" }\n"${weapons[21]}" { "kills" "2" }\n"${weapons[22]}" { "kills" "2" }\n"${weapons[23]}" { "kills" "2" }\n"${weapons[24]}" { "kills" "2" }\n"${weapons[25]}" { "kills" "2" }\n"${weapons[26]}" { "kills" "2" }\n"${weapons[27]}" { "kills" "2" }\n"${weapons[28]}" { "kills" "2" }\n"${weapons[29]}" { "kills" "2" }\n"${weapons[30]}" { "kills" "2" }\n"${weapons[31]}" { "kills" "2" }\n"${weapons[32]}" { "kills" "2" }\n"${weapons[33]}" { "kills" "10" }\n"knifegg" { "kills" "1"}`;

fs.writeFile("cs.txt", content, (err) => {
  if (err) {
    console.err;
    return;
  }
});
