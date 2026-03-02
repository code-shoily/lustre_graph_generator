/// <reference types="./job_matching.d.mts" />
import * as $int from "../../../../gleam_stdlib/gleam/int.mjs";
import * as $io from "../../../../gleam_stdlib/gleam/io.mjs";
import { Ok, Error, toList, Empty as $Empty, prepend as listPrepend } from "../../../gleam.mjs";
import * as $yog from "../../../yog.mjs";
import * as $max_flow from "../../../yog/max_flow.mjs";
import * as $model from "../../../yog/model.mjs";

function find_edge_weight(loop$edges, loop$target) {
  while (true) {
    let edges = loop$edges;
    let target = loop$target;
    if (edges instanceof $Empty) {
      return 0;
    } else {
      let rest = edges.tail;
      let node = edges.head[0];
      let weight = edges.head[1];
      let $ = node === target;
      if ($) {
        return weight;
      } else {
        loop$edges = rest;
        loop$target = target;
      }
    }
  }
}

function find_assignment(
  loop$residual,
  loop$original,
  loop$candidate_id,
  loop$candidate_name,
  loop$jobs
) {
  while (true) {
    let residual = loop$residual;
    let original = loop$original;
    let candidate_id = loop$candidate_id;
    let candidate_name = loop$candidate_name;
    let jobs = loop$jobs;
    if (jobs instanceof $Empty) {
      return new Error(undefined);
    } else {
      let rest_jobs = jobs.tail;
      let job_id = jobs.head[0];
      let job_name = jobs.head[1];
      let _block;
      let _pipe = $model.successors(original, candidate_id);
      _block = find_edge_weight(_pipe, job_id);
      let original_capacity = _block;
      let _block$1;
      let _pipe$1 = $model.successors(residual, candidate_id);
      _block$1 = find_edge_weight(_pipe$1, job_id);
      let residual_capacity = _block$1;
      if (original_capacity === 1 && residual_capacity === 0) {
        return new Ok([candidate_name, job_name]);
      } else {
        loop$residual = residual;
        loop$original = original;
        loop$candidate_id = candidate_id;
        loop$candidate_name = candidate_name;
        loop$jobs = rest_jobs;
      }
    }
  }
}

function extract_assignments(
  loop$residual,
  loop$original,
  loop$candidates,
  loop$jobs
) {
  while (true) {
    let residual = loop$residual;
    let original = loop$original;
    let candidates = loop$candidates;
    let jobs = loop$jobs;
    if (candidates instanceof $Empty) {
      return candidates;
    } else {
      let rest_candidates = candidates.tail;
      let candidate_id = candidates.head[0];
      let candidate_name = candidates.head[1];
      let assignment = find_assignment(
        residual,
        original,
        candidate_id,
        candidate_name,
        jobs,
      );
      if (assignment instanceof Ok) {
        let match = assignment[0];
        return listPrepend(
          match,
          extract_assignments(residual, original, rest_candidates, jobs),
        );
      } else {
        loop$residual = residual;
        loop$original = original;
        loop$candidates = rest_candidates;
        loop$jobs = jobs;
      }
    }
  }
}

function print_assignments(loop$assignments) {
  while (true) {
    let assignments = loop$assignments;
    if (assignments instanceof $Empty) {
      return undefined;
    } else {
      let rest = assignments.tail;
      let candidate = assignments.head[0];
      let job = assignments.head[1];
      $io.println((("  " + candidate) + " -> ") + job);
      loop$assignments = rest;
    }
  }
}

export function main() {
  $io.println("=== Job Matching with Max Flow ===\n");
  $io.println("Candidates and their qualifications:");
  $io.println(
    "  Alice (1): Qualified for Software Engineer (5), Data Analyst (6)",
  );
  $io.println(
    "  Bob (2): Qualified for Software Engineer (5), Project Manager (7)",
  );
  $io.println("  Carol (3): Qualified for Data Analyst (6), Designer (8)");
  $io.println("  Dave (4): Qualified for Project Manager (7), Designer (8)\n");
  let _block;
  let _pipe = $yog.directed();
  let _pipe$1 = $yog.add_edge(_pipe, 0, 1, 1);
  let _pipe$2 = $yog.add_edge(_pipe$1, 0, 2, 1);
  let _pipe$3 = $yog.add_edge(_pipe$2, 0, 3, 1);
  let _pipe$4 = $yog.add_edge(_pipe$3, 0, 4, 1);
  let _pipe$5 = $yog.add_edge(_pipe$4, 1, 5, 1);
  let _pipe$6 = $yog.add_edge(_pipe$5, 1, 6, 1);
  let _pipe$7 = $yog.add_edge(_pipe$6, 2, 5, 1);
  let _pipe$8 = $yog.add_edge(_pipe$7, 2, 7, 1);
  let _pipe$9 = $yog.add_edge(_pipe$8, 3, 6, 1);
  let _pipe$10 = $yog.add_edge(_pipe$9, 3, 8, 1);
  let _pipe$11 = $yog.add_edge(_pipe$10, 4, 7, 1);
  let _pipe$12 = $yog.add_edge(_pipe$11, 4, 8, 1);
  let _pipe$13 = $yog.add_edge(_pipe$12, 5, 9, 1);
  let _pipe$14 = $yog.add_edge(_pipe$13, 6, 9, 1);
  let _pipe$15 = $yog.add_edge(_pipe$14, 7, 9, 1);
  _block = $yog.add_edge(_pipe$15, 8, 9, 1);
  let network = _block;
  let result = $max_flow.edmonds_karp(
    network,
    0,
    9,
    0,
    $int.add,
    (a, b) => { return a - b; },
    $int.compare,
    $int.min,
  );
  $io.println(
    ("Maximum matching: " + $int.to_string(result.max_flow)) + " people can be assigned to jobs",
  );
  let $ = result.max_flow === 4;
  if ($) {
    $io.println("Perfect matching! All jobs can be filled.")
  } else {
    $io.println(
      ("Only " + $int.to_string(result.max_flow)) + " jobs can be filled with qualified candidates.",
    )
  }
  $io.println("\nAssignments (by analyzing flow):");
  $io.println(
    "To see actual assignments, check which edges from candidates to jobs have flow > 0",
  );
  let assignments = extract_assignments(
    result.residual_graph,
    network,
    toList([[1, "Alice"], [2, "Bob"], [3, "Carol"], [4, "Dave"]]),
    toList([
      [5, "Software Engineer"],
      [6, "Data Analyst"],
      [7, "Project Manager"],
      [8, "Designer"],
    ]),
  );
  return print_assignments(assignments);
}
