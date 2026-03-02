/// <reference types="./medical_residency.d.mts" />
import * as $dict from "../../../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../../gleam_stdlib/gleam/option.mjs";
import { Ok, toList, Empty as $Empty, prepend as listPrepend, isEqual } from "../../../gleam.mjs";
import * as $bipartite from "../../../yog/bipartite.mjs";

function list_at(loop$lst, loop$index) {
  while (true) {
    let lst = loop$lst;
    let index = loop$index;
    if (lst instanceof $Empty) {
      return new $option.None();
    } else if (index === 0) {
      let first = lst.head;
      return new $option.Some(first);
    } else {
      let n = index;
      if (n > 0) {
        let rest = lst.tail;
        loop$lst = rest;
        loop$index = n - 1;
      } else {
        return new $option.None();
      }
    }
  }
}

function get_name(names, index) {
  let $ = list_at(names, index);
  if ($ instanceof $option.Some) {
    let name = $[0];
    return name;
  } else {
    return "Unknown";
  }
}

function do_index_of(loop$lst, loop$target, loop$current) {
  while (true) {
    let lst = loop$lst;
    let target = loop$target;
    let current = loop$current;
    if (lst instanceof $Empty) {
      return new $option.None();
    } else {
      let first = lst.head;
      let rest = lst.tail;
      let $ = isEqual(first, target);
      if ($) {
        return new $option.Some(current);
      } else {
        loop$lst = rest;
        loop$target = target;
        loop$current = current + 1;
      }
    }
  }
}

function list_index_of(lst, target) {
  return do_index_of(lst, target, 0);
}

function get_rank(prefs, person, target) {
  let $ = $dict.get(prefs, person);
  if ($ instanceof Ok) {
    let pref_list = $[0];
    let $1 = list_index_of(pref_list, target);
    if ($1 instanceof $option.Some) {
      let idx = $1[0];
      return idx + 1;
    } else {
      return 999;
    }
  } else {
    return 999;
  }
}

function list_range(start, end) {
  let $ = start > end;
  if ($) {
    return toList([]);
  } else {
    return listPrepend(start, list_range(start + 1, end));
  }
}

export function main() {
  $io.println("--- Medical Residency Matching (NRMP Style) ---");
  $io.println("");
  let residents = $dict.from_list(
    toList([
      [1, toList([101, 102, 103, 104, 105])],
      [2, toList([102, 105, 101, 103, 104])],
      [3, toList([103, 101, 104, 102, 105])],
      [4, toList([104, 103, 105, 102, 101])],
      [5, toList([105, 104, 103, 102, 101])],
    ]),
  );
  let hospitals = $dict.from_list(
    toList([
      [101, toList([3, 1, 2, 4, 5])],
      [102, toList([1, 2, 5, 3, 4])],
      [103, toList([3, 4, 1, 2, 5])],
      [104, toList([4, 5, 3, 2, 1])],
      [105, toList([5, 2, 4, 3, 1])],
    ]),
  );
  $io.println("Resident Preferences:");
  $io.println(
    "  Dr. Anderson (1): City General, Metro, University, Regional, Coastal",
  );
  $io.println(
    "  Dr. Brown (2):    Metro, Coastal, City General, University, Regional",
  );
  $io.println(
    "  Dr. Chen (3):     University, City General, Regional, Metro, Coastal",
  );
  $io.println(
    "  Dr. Davis (4):    Regional, University, Coastal, Metro, City General",
  );
  $io.println(
    "  Dr. Evans (5):    Coastal, Regional, University, Metro, City General",
  );
  $io.println("");
  $io.println("Hospital Preferences:");
  $io.println("  City General (101):  Chen, Anderson, Brown, Davis, Evans");
  $io.println("  Metro Hospital (102): Anderson, Brown, Evans, Chen, Davis");
  $io.println("  University Med (103): Chen, Davis, Anderson, Brown, Evans");
  $io.println("  Regional Care (104):  Davis, Evans, Chen, Brown, Anderson");
  $io.println("  Coastal Medical (105): Evans, Brown, Davis, Chen, Anderson");
  $io.println("");
  let matching = $bipartite.stable_marriage(residents, hospitals);
  $io.println("=== Stable Matching Results ===");
  $io.println("");
  let resident_names = toList(["Anderson", "Brown", "Chen", "Davis", "Evans"]);
  let hospital_names = toList([
    "City General",
    "Metro Hospital",
    "University Med",
    "Regional Care",
    "Coastal Medical",
  ]);
  let _pipe = list_range(1, 5);
  $list.each(
    _pipe,
    (resident_id) => {
      let $ = $bipartite.get_partner(matching, resident_id);
      if ($ instanceof $option.Some) {
        let hospital_id = $[0];
        let resident_name = get_name(resident_names, resident_id - 1);
        let hospital_name = get_name(hospital_names, hospital_id - 101);
        let resident_rank = get_rank(residents, resident_id, hospital_id);
        let hospital_rank = get_rank(hospitals, hospital_id, resident_id);
        $io.println(
          ((((((("Dr. " + resident_name) + " (#") + $int.to_string(resident_id)) + ") matched to ") + hospital_name) + " (#") + $int.to_string(
            hospital_id,
          )) + ")",
        );
        $io.println(
          ("  - Resident's rank for this hospital: " + $int.to_string(
            resident_rank,
          )) + " of 5",
        );
        return $io.println(
          ("  - Hospital's rank for this resident: " + $int.to_string(
            hospital_rank,
          )) + " of 5",
        );
      } else {
        let resident_name = get_name(resident_names, resident_id - 1);
        return $io.println(("Dr. " + resident_name) + " was not matched");
      }
    },
  )
  $io.println("");
  $io.println("--- Properties of This Matching ---");
  $io.println(
    "✓ Stable: No resident-hospital pair would both prefer each other",
  );
  $io.println(
    "✓ Complete: All participants are matched (groups are equal size)",
  );
  $io.println("✓ Resident-optimal: Residents get best stable outcome possible");
  $io.println(
    "✓ Hospital-pessimal: Hospitals get worst stable outcome possible",
  );
  $io.println("");
  return $io.println("This is the same algorithm used by the real NRMP!");
}
