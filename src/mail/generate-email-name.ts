// @ts-nocheck
function randomLowercaseString(minLength, maxLength = minLength) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const size =
    minLength === maxLength
      ? minLength
      : Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let result = "";

  for (let i = 0; i < size; i += 1) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

function randomPick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maybe(value, probability = 0.5) {
  return Math.random() < probability ? value : "";
}

export function generateEmailName() {
  const names = [
    "alex", "sam", "leo", "mia", "nina", "luca", "ivan", "emma",
    "noah", "zoe", "adam", "lily", "dylan", "lucy", "mason", "ella",
    "ruby", "owen", "chloe", "ethan", "ava", "liam", "aria", "logan",
    "grace", "nolan", "stella", "isaac", "hannah", "caleb", "scarlett", "jack",
    "elena", "ryan", "hazel", "carter", "bella", "asher", "julia", "wyatt",
    "sophie", "julian", "nora", "hudson", "violet", "ian", "claire", "ezra",
    "naomi", "kai", "alice", "jude", "layla", "theo", "lucas", "maya",
  ];
  const surnames = [
    "cole", "stone", "hart", "reed", "blake", "frost", "wells", "ross",
    "bennett", "turner", "hayes", "parker", "miles", "lane", "brooks", "evans",
    "cooper", "morgan", "griffin", "watson", "porter", "hughes", "tucker", "bishop",
    "sanders", "pearson", "carter", "murphy", "sullivan", "fisher", "bailey", "howard",
    "spencer", "webb", "holland", "palmer", "gibson", "mason", "perry", "harrison",
    "harper", "west", "woods", "kennedy", "fletcher", "carson", "simmons", "walsh",
  ];
  const adjectives = [
    "quiet", "silver", "midnight", "lucky", "tiny", "sunny", "blue", "urban",
    "golden", "wild", "dusty", "frozen", "velvet", "rapid", "brave", "gentle",
    "soft", "bright", "calm", "cool", "mellow", "clever", "happy", "fancy",
    "cosmic", "crystal", "electric", "gold", "icy", "jolly", "kind", "lazy",
    "magic", "neon", "noble", "polar", "quick", "rainy", "smart", "smooth",
    "stellar", "sunset", "super", "vivid", "warm", "young", "zesty", "chill",
    "glossy", "misty", "pearl", "rusty", "shiny", "silent", "sleepy", "vintage",
  ];
  const nouns = [
    "raven", "fox", "tiger", "river", "forest", "rocket", "pixel", "vibe",
    "dream", "echo", "cloud", "stone", "falcon", "nova", "comet", "wave",
    "maple", "meadow", "brook", "sky", "owl", "otter", "sparrow", "breeze",
    "harbor", "canyon", "orbit", "anchor", "marble", "ember", "lotus", "dawn",
    "dusk", "phoenix", "orbit", "planet", "garden", "studio", "valley", "bridge",
    "signal", "magnet", "planet", "orbit", "banner", "cabin", "circle", "delta",
    "feather", "glow", "horizon", "island", "jungle", "kitten", "lantern", "mirror",
    "oasis", "pebble", "rain", "summit", "temple", "voyage", "willow", "zenith",
  ];
  const suffixWords = [
    "lab", "box", "hub", "zone", "home", "spot", "works", "studio",
    "base", "corner", "point", "space", "desk", "field", "room", "place",
    "world", "garden", "garage", "house", "nest", "path", "story", "view",
    "club", "line", "port", "station", "market", "camp", "park", "circle",
  ];
  const separators = ["", "", "", "_", "-"];
  const currentYearTail = `${new Date().getFullYear()}`.slice(-2);

  const builders = [
    () => `${randomPick(names)}${randomPick(separators)}${randomPick(surnames)}`,
    () => `${randomPick(names)}${maybe(randomPick(separators) + randomPick(nouns), 0.7)}`,
    () => `${randomPick(adjectives)}${randomPick(separators)}${randomPick(nouns)}`,
    () => `${randomPick(nouns)}${randomPick(separators)}${randomPick(suffixWords)}`,
    () => `${randomPick(names)}${randomPick(separators)}${randomPick(adjectives)}${maybe(randomPick([currentYearTail, `${randomInt(7, 98)}`]), 0.5)}`,
    () => `${randomPick(names)}${maybe(randomPick([".", "_", "-"]) + randomPick(surnames), 0.6)}${maybe(`${randomInt(10, 999)}`, 0.4)}`,
    () => `${randomPick(adjectives)}${randomPick(nouns)}${maybe(`${randomInt(1, 99)}`, 0.35)}`,
  ];

  let localPart = randomPick(builders)().toLowerCase();
  localPart = localPart
    .replace(/[^a-z0-9._-]+/g, "")
    .replace(/[._-]{2,}/g, (match) => match[0])
    .replace(/^[._-]+|[._-]+$/g, "");

  if (localPart.length < 5) {
    localPart += randomLowercaseString(2, 4);
  }
  if (localPart.length > 22) {
    localPart = localPart.slice(0, 22).replace(/[._-]+$/g, "");
  }

  return localPart;
}
