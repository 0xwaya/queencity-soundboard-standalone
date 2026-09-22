import { redirect } from "next/navigation";

// Latin events now live in the general events feed, filterable by category.
export default function LatinEventsRedirect() {
  redirect("/events?category=latin");
}
