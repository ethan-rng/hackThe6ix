import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Nav from "./nav";
import Heatmap from "@/components/Heatmap";

const sideBarCSS = `flex flex-row items-center text-3xl hover:bg-secondary w-full h-16 pl-10`;

const page = async ({ params }) => {
  const { slug } = params;

  const client = await clientPromise;
  const db = client.db("hackthe6ix");
  const venue = await db
    .collection("venues")
    .findOne({ _id: new ObjectId(slug) });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-row">
        <div className="w-1/6 flex flex-col h-screen"></div>

        <div className="w-5/6 flex justify-center items-center max-h-screen overflow-auto bg-purple-500">
          <div className="relative w-full h-full">
            <Image
              src={"/placeholder.jpg"}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="max-h-full w-full"
            />
            <Heatmap
              data={{
                prediction: [
                  { x: 10, y: 10 },
                  { x: 100, y: 100 },
                  { x: 200, y: 200 },
                  { x: 300, y: 300 },
                  { x: 400, y: 400 },
                  { x: 500, y: 500 },
                  { x: 600, y: 600 },
                  { x: 620, y: 600 },
                  { x: 600, y: 640 },
                  { x: 610, y: 600 },
                  { x: 680, y: 600 },
                  { x: 610, y: 600 },
                  { x: 731, y: 409 },
                  { x: 571, y: 671 },
                  { x: 781, y: 696 },
                  { x: 440, y: 743 },
                  { x: 684, y: 800 },
                  { x: 459, y: 578 },
                  { x: 746, y: 563 },
                  { x: 642, y: 763 },
                  { x: 572, y: 437 },
                  { x: 404, y: 738 },
                  { x: 676, y: 697 },
                  { x: 426, y: 446 },
                  { x: 417, y: 627 },
                  { x: 486, y: 711 },
                  { x: 505, y: 689 },
                  { x: 780, y: 486 },
                  { x: 427, y: 580 },
                  { x: 677, y: 541 },
                  { x: 726, y: 728 },
                  { x: 691, y: 537 },
                  { x: 613, y: 717 },
                  { x: 750, y: 578 },
                  { x: 736, y: 686 },
                  { x: 643, y: 448 },
                  { x: 481, y: 719 },
                  { x: 796, y: 450 },
                  { x: 437, y: 797 },
                  { x: 681, y: 755 },
                  { x: 452, y: 798 },
                  { x: 480, y: 494 },
                  { x: 743, y: 617 },
                  { x: 734, y: 692 },
                  { x: 741, y: 589 },
                  { x: 800, y: 573 },
                  { x: 749, y: 441 },
                  { x: 622, y: 730 },
                  { x: 482, y: 410 },
                  { x: 572, y: 404 },
                  { x: 796, y: 428 },
                  { x: 618, y: 636 },
                  { x: 708, y: 507 },
                  { x: 565, y: 790 },
                  { x: 522, y: 529 },
                  { x: 400, y: 580 },
                  { x: 482, y: 680 },
                  { x: 660, y: 653 },
                  { x: 574, y: 585 },
                  { x: 503, y: 550 },
                  { x: 730, y: 689 },
                  { x: 481, y: 421 },
                  { x: 709, y: 641 },
                  { x: 402, y: 692 },
                  { x: 681, y: 530 },
                  { x: 609, y: 627 },
                  { x: 789, y: 440 },
                  { x: 760, y: 475 },
                  { x: 583, y: 648 },
                  { x: 458, y: 510 },
                  { x: 536, y: 513 },
                  { x: 415, y: 416 },
                  { x: 513, y: 537 },
                  { x: 733, y: 424 },
                  { x: 649, y: 564 },
                  { x: 558, y: 746 },
                  { x: 608, y: 709 },
                  { x: 552, y: 402 },
                  { x: 622, y: 501 },
                  { x: 478, y: 472 },
                  { x: 549, y: 634 },
                  { x: 668, y: 483 },
                  { x: 409, y: 571 },
                  { x: 530, y: 797 },
                  { x: 632, y: 530 },
                  { x: 445, y: 580 },
                  { x: 567, y: 751 },
                  { x: 713, y: 780 },
                  { x: 480, y: 550 },
                  { x: 746, y: 522 },
                  { x: 646, y: 680 },
                  { x: 455, y: 798 },
                  { x: 715, y: 794 },
                  { x: 484, y: 682 },
                  { x: 546, y: 452 },
                  { x: 770, y: 756 },
                  { x: 593, y: 576 },
                  { x: 422, y: 687 },
                  { x: 609, y: 602 },
                  { x: 598, y: 552 },
                  { x: 488, y: 600 },
                  { x: 706, y: 756 },
                  { x: 766, y: 575 },
                  { x: 754, y: 630 },
                  { x: 555, y: 574 },
                  { x: 781, y: 438 },
                  { x: 679, y: 562 },
                  { x: 762, y: 635 },
                  { x: 687, y: 681 },
                  { x: 523, y: 776 },
                  { x: 469, y: 773 },
                  { x: 719, y: 624 },
                ],
              }}
            />
          </div>
        </div>
      </div>
      <Nav params={params}/>
    </div>
  );
};

export default withPageAuthRequired(page);
