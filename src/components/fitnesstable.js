import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { db } from '../firebase';

const FitnessTable = () => {
  const [fitnessExercises, setFitnessExercises] = useState({    "HIIT Exercises": [
    "Burpees",
    "Jumping jacks",
    "High knees",
    "Butt kicks",
    "Mountain climbers",
    "Squat jumps",
    "Plyometric lunges",
    "Plyometric push-ups",
    "Box jumps",
    "Jump rope",
    "Sprints",
    "Tuck jumps",
    "Wall balls",
    "Thrusters",
    "Kettlebell swings",
    "Battle ropes",
    "Rowing machine sprints",
    "Cycling sprints",
    "Stair climbing",
    "Medicine ball slams",
    "Lateral jumps",
    "Skater jumps",
    "Broad jumps",
    "Bear crawls",
    "Crab walks",
    "Sprawl and jump",
    "High box step-ups",
    "Push-up jacks",
    "Plank jacks",
    "Squat thrusts",
    "Jumping lunges",
    "Reverse lunges with knee drive",
    "Sprinter sit-ups",
    "Russian twists with medicine ball",
    "Plank with shoulder taps",
    "Bicycle crunches",
    "Mountain climbers with sliders",
    "Dumbbell clean and press",
    "Dumbbell thrusters",
    "Rowing machine intervals"
    ],

    "calisthenics exercises": [
        "Push-ups",
        "Squats",
        "Lunges",
        "Burpees",
        "Pull-ups",
        "Dips",
        "Leg raises",
        "Plank",
        "Mountain climbers",
        "Jumping jacks",
        "High knees",
        "Butt kicks",
        "Sit-ups",
        "Crunches",
        "Bicycle crunches",
        "Russian twists",
        "Wall sits",
        "Superman",
        "Bird dog",
        "Plank jacks",
        "Side plank",
        "Spiderman push-up",
        "Tricep dips",
        "Handstands",
        "Pike push-ups",
        "Jump squats",
        "Reverse crunches",
        "Side lunges",
        "Wall push-ups",
        "Box jumps",
        "L-sit",
        "Pistol squat",
        "Muscle-up",
        "Planche",
        "Front lever",
        "Back lever",
        "Human flag",
        "Handstand push-up",
        "Lateral jumps",
        "Frog jumps",
        "Tuck jumps",
        "Hollow body hold",
        "Arch body hold",
        "Straddle ups",
        "Dragon flag",
        "Windshield wipers",
        "Inverted rows",
        "Diamond push-ups",
        "Decline push-ups",
        "Clapping push-ups"
        ],
        "exercises": [
            "100-meter sprints",
            "200-meter sprints",
            "400-meter sprints",
            "800-meter sprints",
            "Hill sprints",
            "Stair sprints",
            "Shuttle runs",
            "Suicides",
            "Fartlek training",
            "Pyramid sprints",
            "Interval sprints",
            "Uphill sprints",
            "Downhill sprints",
            "Sled pushes",
            "Sled pulls",
            "Tire flips",
            "Kettlebell swings",
            "Box jumps",
            "Plyometric lunges",
            "Plyometric push-ups",
            "Medicine ball slams",
            "Power skips",
            "Power lunges",
            "Power jumps",
            "Lateral hops",
            "Jumping lunges",
            "Tuck jumps",
            "Squat jumps",
            "Burpees",
            "Push-up jacks",
            "Plank jacks",
            "Broad jumps",
            "Bear crawls",
            "Crab walks",
            "Sprawl and jump",
            "Sprinter sit-ups",
            "Russian twists with medicine ball",
            "Bicycle crunches",
            "Mountain climbers with sliders",
            "Dumbbell thrusters"
            ],
            "Zumba": [
                "Basic Step",
                "Salsa Basic Step",
                "Cumbia Basic Step",
                "Reggaeton Basic Step",
                "Merengue Basic Step",
                "Mambo Basic Step",
                "Cha-Cha Basic Step",
                "Bachata Basic Step",
                "Samba Basic Step",
                "Belly Dance Hip Shimmy",
                "Belly Dance Chest Shimmy",
                "Belly Dance Figure Eight",
                "Belly Dance Snake Arms",
                "Belly Dance Arabic Step",
                "Hip Hop Step",
                "Bollywood Step",
                "African Step",
                "Flamenco Step",
                "Tango Step",
                "Swing Step",
                "Irish Step Dance Step",
                "Capoeira Ginga Step",
                "Axe Step",
                "Quebradita Step",
                "Zouk Step",
                "Kizomba Step",
                "Axe Bahia Step",
                "Lambada Step",
                "Disco Step",
                "Calypso Step",
                "Hula Step",
                "Mambo Shuffle",
                "Grapevine Step",
                "Lateral Step",
                "Cross-Over Step",
                "T-Step",
                "Knee Lift",
                "Heel Tap",
                "Lunge",
                "Jump"
                ],
            "flexibility": [
                    "Standing Quad Stretch",
                    "Standing Hamstring Stretch",
                    "Standing Calf Stretch",
                    "Standing Toe Touches",
                    "Forward Lunges",
                    "Side Lunges",
                    "Standing Inner Thigh Stretch",
                    "Standing Outer Thigh Stretch",
                    "Seated Forward Bend",
                    "Seated Wide-Legged Forward Bend",
                    "Seated Butterfly Stretch",
                    "Seated Spinal Twist",
                    "Seated Pigeon Stretch",
                    "Seated Figure Four Stretch",
                    "Supine Hamstring Stretch",
                    "Supine Butterfly Stretch",
                    "Supine Spinal Twist",
                    "Supine Figure Four Stretch",
                    "Quad Stretch with Wall Support",
                    "Hamstring Stretch with Wall Support",
                    "Calf Stretch with Wall Support",
                    "Kneeling Hip Flexor Stretch",
                    "Kneeling Quad Stretch",
                    "Kneeling Hamstring Stretch",
                    "Child's Pose",
                    "Cat-Cow Stretch",
                    "Downward-Facing Dog",
                    "Cobra Pose",
                    "Extended Triangle Pose",
                    "Warrior I Pose",
                    "Warrior II Pose",
                    "Tree Pose",
                    "Eagle Pose",
                    "Half Pigeon Pose",
                    "Frog Pose",
                    "Happy Baby Pose",
                    "Bridge Pose",
                    "Wheel Pose",
                    "Plow Pose",
                    "Shoulder Stand",
                    "Headstand",
                    "Handstand",
                    "Crab Walk",
                    "Fire Log Pose",
                    "Lizard Pose",
                    "Supine Butterfly Pose with Wall Support",
                    "Upward Dog Pose",
                    "Supine Crescent Pose",
                    "Supine Spinal Twist with Knee Hug",
                    "Reclined Hero Pose",
                    "Seated Staff Pose",
                    "Seated Straddle Stretch",
                    "Wall Straddle Stretch",
                    "Wide-Legged Forward Fold with Twist",
                    "Reverse Prayer Pose",
                    "Half Lord of the Fishes Pose",
                    "Extended Side Angle Pose",
                    "Camel Pose",
                    "Bow Pose",
                    "Cow Face Pose",
                    "Standing Forward Bend with Shoulder Opener",
                    "Supine Spinal Twist with Bind",
                    "Lizard Pose with Bind",
                    "Frog Pose with Bind",
                    "L-Shaped Handstand with Straddle",
                    "L-Shaped Handstand with Pike",
                    "Full Splits Pose",
                    "Pigeon Pose with Quad Stretch",
                    "Lizard Pose with Quad Stretch",
                    "Seated Forward Bend with Shoulder Stretch",
                    "Supine Pigeon Pose",
                    "Supine Figure Four Pose with Twist",
                    "Reclined Bound Angle Pose",
                    "Cow Face Pose with Eagle Arms",
                    "Puppy Pose",
                    "Scorpion Pose",
                    "Forearm Stand",
                    "King Pigeon Pose",
                    "Baby Grasshopper Pose",
                    "Scissors Stretch",
                    "Supported Shoulderstand",
                    "Fish Pose",
                    "Gate Pose",
                    "Cow Face Pose with Arms Overhead",
                    "Shoulder Opener with Wall",
                    "Thread the Needle Pose",
                    "Eagle Pose with Forward Fold",
                    "Seated Half King Pigeon Pose",
                    "Wide-Legged Forward Fold with Bind",
                    "Reclined Hand-to-Big-Toe Pose"
                    ],
                    "Pilates": [
                        "The Hundred",
                        "Roll Up",
                        "Roll Over",
                        "Single Leg Circles",
                        "Rolling Like a Ball",
                        "Single Leg Stretch",
                        "Double Leg Stretch",
                        "Spine Stretch Forward",
                        "Open Leg Rocker",
                        "Corkscrew",
                        "Saw",
                        "Swan Dive",
                        "Single Leg Kick",
                        "Double Leg Kick",
                        "Neck Pull",
                        "Scissors",
                        "Bicycle",
                        "Shoulder Bridge",
                        "Spine Twist",
                        "Jackknife",
                        "Teaser",
                        "Hip Circles",
                        "Side Kick Series",
                        "Seal",
                        "Crab",
                        "Plank",
                        "Side Plank",
                        "Swimming",
                        "Leg Pull Front",
                        "Leg Pull Back",
                        "Push-Up",
                        "Double Leg Lower Lifts",
                        "Double Leg Extension",
                        "High Scissors",
                        "Low Scissors",
                        "High Bicycle",
                        "Low Bicycle",
                        "Table Top",
                        "Open Leg Balance",
                        "Side Leg Lifts",
                        "Side Leg Circles",
                        "Heel Taps",
                        "Toe Taps",
                        "Heel Squeezes",
                        "Toe Squeezes",
                        "Clams",
                        "Lateral Leg Lifts",
                        "Standing Arm Series",
                        "Rolling Ball",
                        "Squats"
                        ],
                        "cardio exercises": [
                            "Jumping jacks",
                            "High knees",
                            "Jumping rope",
                            "Burpees",
                            "Mountain climbers",
                            "Running in place",
                            "Lateral shuffles",
                            "Tuck jumps",
                            "Skater jumps",
                            "Box jumps",
                            "Sprints",
                            "Cycling",
                            "Stair climbing",
                            "Elliptical machine",
                            "Rowing machine",
                            "Kickboxing",
                            "Shadowboxing",
                            "Jump squats",
                            "Jump lunges",
                            "Speed skaters",
                            "Side shuffles",
                            "Bear crawls",
                            "Crab walks",
                            "Butt kicks",
                            "Power skips",
                            "Plyometric push-ups",
                            "Quick feet drills",
                            "Agility ladder drills",
                            "Sprint intervals",
                            "Hill sprints",
                            "Swimming laps",
                            "Jumping onto and off a step",
                            "Dance cardio",
                            "Treadmill sprints",
                            "Kettlebell swings",
                            "Battle ropes",
                            "Biking",
                            "Jumping burpees",
                            "Shadow boxing with burpees",
                            "Running stairs",
                            "Water aerobics",
                            "Jumping over cones",
                            "Hiking",
                            "Circuit training",
                            "Rowing intervals",
                            "Jumping jacks with cross jacks",
                            "Star jumps",
                            "Squat jumps with lateral jumps",
                            "Skipping",
                            "Incline walking on treadmill"
                            ],
                            "bodyweight exercises": [
                                "Push-ups",
                                "Squats",
                                "Lunges",
                                "Burpees",
                                "Jumping jacks",
                                "Plank",
                                "Mountain climbers",
                                "High knees",
                                "Butt kicks",
                                "Leg raises",
                                "Sit-ups",
                                "Crunches",
                                "Bicycle crunches",
                                "Russian twists",
                                "Wall sits",
                                "Superman",
                                "Bird dog",
                                "Plank jacks",
                                "Side plank",
                                "Spiderman push-up",
                                "Tricep dips",
                                "Handstands",
                                "Pike push-ups",
                                "Jump squats",
                                "Reverse crunches",
                                "Side lunges",
                                "Wall push-ups",
                                "Box jumps",
                                "Plyometric push-ups",
                                "Plyometric lunges",
                                "Jumping lunges",
                                "Jumping squats",
                                "Side leg lifts",
                                "Glute bridges",
                                "Donkey kicks",
                                "Hip thrusts",
                                "Crab walks",
                                "Bear crawls",
                                "Inchworms",
                                "Broad jumps"
                                ],
                                "barre exercises": [
                                    "Plies",
                                    "Plié squats",
                                    "Relevé calf raises",
                                    "Leg lifts",
                                    "Leg circles",
                                    "Fire hydrants",
                                    "Donkey kicks",
                                    "Attitude pulses",
                                    "Attitude lifts",
                                    "Arabesque holds",
                                    "Battement tendus",
                                    "Grand battements",
                                    "Developpé",
                                    "Passe",
                                    "Lateral leg lifts",
                                    "Forward folds",
                                    "Roll downs",
                                    "Arm circles",
                                    "Tricep dips",
                                    "Plank with leg lifts",
                                    "Side plank with leg lifts",
                                    "Glute bridge",
                                    "Pilates stance squats",
                                    "Standing splits",
                                    "Knee lifts",
                                    "Calf raises",
                                    "Hip dips",
                                    "Side kicks",
                                    "V-sits",
                                    "Seated twists",
                                    "Plank with knee tucks",
                                    "Curtsy lunges",
                                    "Lunges with leg lifts",
                                    "Relevé pulses",
                                    "First position plié with heel raises",
                                    "Second position plié",
                                    "Third position plié",
                                    "Fourth position plié",
                                    "Fifth position plié",
                                    "Ballet burpees"
                                    ],
                                    "sprint_training_exercises": [
                                        "100-meter sprints",
                                        "200-meter sprints",
                                        "400-meter sprints",
                                        "800-meter sprints",
                                        "Hill sprints",
                                        "Stair sprints",
                                        "Shuttle runs",
                                        "Suicides",
                                        "Fartlek training",
                                        "Pyramid sprints",
                                        "Interval sprints",
                                        "Uphill sprints",
                                        "Downhill sprints",
                                        "Sled pushes",
                                        "Sled pulls",
                                        "Tire flips",
                                        "Kettlebell swings",
                                        "Box jumps",
                                        "Plyometric lunges",
                                        "Plyometric push-ups",
                                        "Medicine ball slams",
                                        "Power skips",
                                        "Power lunges",
                                        "Power jumps",
                                        "Lateral hops",
                                        "Jumping lunges",
                                        "Tuck jumps",
                                        "Squat jumps",
                                        "Burpees",
                                        "Push-up jacks",
                                        "Plank jacks",
                                        "Broad jumps",
                                        "Bear crawls",
                                        "Crab walks",
                                        "Sprawl and jump",
                                        "Sprinter sit-ups",
                                        "Russian twists with medicine ball",
                                        "Bicycle crunches",
                                        "Mountain climbers with sliders",
                                        "Dumbbell thrusters"
                                        ],
                                        "Pranayama": [
                                            "Kapalbhati Pranayama",
                                            "Anulom Vilom Pranayama",
                                            "Bhastrika Pranayama",
                                            "Bhramari Pranayama",
                                            "Ujjayi Pranayama",
                                            "Shitali Pranayama",
                                            "Sitkari Pranayama",
                                            "Nadi Shodhana Pranayama",
                                            "Surya Bhedana Pranayama",
                                            "Chandra Bhedana Pranayama",
                                            "Bhaya Pranayama",
                                            "Nadi Sanchalana Pranayama",
                                            "Sama Vritti Pranayama",
                                            "Visama Vritti Pranayama",
                                            "Shining Skull Breath (Kapalabhati with breath retention)",
                                            "Bhramari with extended exhale",
                                            "Murcha Pranayama",
                                            "Plavini Pranayama",
                                            "Viloma Ujjayi Pranayama",
                                            "Viloma Chandra Bhedana Pranayama",
                                            "Viloma Surya Bhedana Pranayama",
                                            "Viloma Nadi Shodhana Pranayama",
                                            "Sitali-Sitkari Pranayama",
                                            "Ujjayi Bhastrika Pranayama",
                                            "Ujjayi Surya Bhedana Pranayama",
                                            "Ujjayi Chandra Bhedana Pranayama",
                                            "Ujjayi Nadi Shodhana Pranayama",
                                            "Ujjayi Shitali Pranayama",
                                            "Ujjayi Sitkari Pranayama",
                                            "Nadi Shodhana with retention",
                                            "Nadi Shodhana with bandhas",
                                            "Brahmari with antara kumbhaka",
                                            "Bhastrika with bandhas",
                                            "Sama Vritti with jalandhara bandha",
                                            "Sama Vritti with moola bandha",
                                            "Sama Vritti with uddiyana bandha",
                                            "Bhramari with kaki mudra",
                                            "Nadi Shodhana with shanmukhi mudra",
                                            "Ujjayi with shambhavi mudra",
                                            "Bhastrika with shakti chalana mudra"
                                            ],

                                            "Yoga": [
                                                "Mountain Pose (Tadasana)",
                                                "Downward Facing Dog (Adho Mukha Svanasana)",
                                                "Tree Pose (Vrksasana)",
                                                "Warrior I (Virabhadrasana I)",
                                                "Warrior II (Virabhadrasana II)",
                                                "Child's Pose (Balasana)",
                                                "Corpse Pose (Savasana)",
                                                "Cobra Pose (Bhujangasana)",
                                                "Cat-Cow Stretch (Marjaryasana-Bitilasana)",
                                                "Pigeon Pose (Kapotasana)",
                                                "Bridge Pose (Setu Bandhasana)",
                                                "Chair Pose (Utkatasana)",
                                                "Triangle Pose (Trikonasana)",
                                                "Plank Pose (Kumbhakasana)",
                                                "Fish Pose (Matsyasana)",
                                                "Boat Pose (Navasana)",
                                                "Seated Forward Bend (Paschimottanasana)",
                                                "Camel Pose (Ustrasana)",
                                                "Crow Pose (Bakasana)",
                                                "Eagle Pose (Garudasana)",
                                                "Fish Pose (Matsyasana)",
                                                "Handstand (Adho Mukha Vrksasana)",
                                                "Headstand (Sirsasana)",
                                                "Shoulder Stand (Sarvangasana)",
                                                "Half Moon Pose (Ardha Chandrasana)",
                                                "Cobra Pose (Bhujangasana)",
                                                "Cow Face Pose (Gomukhasana)",
                                                "Firefly Pose (Tittibhasana)",
                                                "Frog Pose (Bhekasana)",
                                                "Garland Pose (Malasana)",
                                                "Half Pigeon Pose (Ardha Kapotasana)",
                                                "Happy Baby Pose (Ananda Balasana)",
                                                "Legs Up the Wall Pose (Viparita Karani)",
                                                "Lizard Pose (Utthan Pristhasana)",
                                                "Locust Pose (Salabhasana)",
                                                "Lotus Pose (Padmasana)",
                                                "Reclining Bound Angle Pose (Supta Baddha Konasana)",
                                                "Revolved Triangle Pose (Parivrtta Trikonasana)",
                                                "Sphinx Pose (Salamba Bhujangasana)",
                                                "Upward Facing Dog (Urdhva Mukha Svanasana)"
                                                ],
                                                "Strength Training Workouts": [
                                                    "Weightlifting",
                                                    "Bodybuilding",
                                                    "Powerlifting",
                                                    "Olympic weightlifting",
                                                    "Circuit training",
                                                    "Resistance band training",
                                                    "CrossFit",
                                                    "Calisthenics",
                                                    "Push-ups",
                                                    "Pull-ups",
                                                    "Dips",
                                                    "Squats",
                                                    "Lunges",
                                                    "Deadlifts",
                                                    "Bench press",
                                                    "Shoulder press",
                                                    "Bicep curls",
                                                    "Tricep extensions",
                                                    "Leg press",
                                                    "Leg curls",
                                                    "Leg extensions",
                                                    "Hip thrusts",
                                                    "Glute bridges",
                                                    "Box jumps",
                                                    "Step-ups",
                                                    "Farmer's walk",
                                                    "Kettlebell swings",
                                                    "Medicine ball",
                                                    "Battle ropes",
                                                    "Tire flips",
                                                    "Wall sits",
                                                    "Planks",
                                                    "Russian twists",
                                                    "Sit-ups",
                                                    "Ab crunches",
                                                    "Cable pulls",
                                                    "Resistance machines",
                                                    "Suspension training",
                                                    "TRX training",
                                                    "Isometric holds",
                                                    "Iso-lateral training",
                                                    "Super sets",
                                                    "Drop sets",
                                                    "Pyramid sets",
                                                    "Giant sets",
                                                    "Iso-holds",
                                                    "Negative reps"
                                                ]

   
  });

  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const addFitnessExercises = async () => {
      for (const category in fitnessExercises) {
        const categoryDocRef = await addDoc(collection(db, 'categories'), {
          name: category,
        });
        const categoryId = categoryDocRef.id;

        for (const exercise of fitnessExercises[category]) {
          await addDoc(collection(db, 'exercises'), {
            cId: categoryId,
            name: exercise,
          });
        }
      }
    };

    addFitnessExercises();
  }, []);

  const handleSearch = () => {
    const filtered = [];
    Object.entries(fitnessExercises).forEach(([category, exerciseList]) => {
      exerciseList.forEach((exercise) => {
        if (exercise.toLowerCase().includes(searchTerm.toLowerCase())) {
          filtered.push({ category, exercise });
        }
      });
    });
    setFilteredExercises(filtered);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* <TextField
          label="Search exercises"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}>
          Search
        </Button> */}

{/* <Button
  variant="contained"
  color="primary"
  startIcon={<SearchIcon />}
  sx={{ ml: 5 }}
  onClick={handleSearch}
>
  Search


</Button> */}



<TextField
  label="Search exercises"
  variant="outlined"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  sx={{
    width: '100%',
    maxWidth: '500px',
    marginBottom: '1rem',
    paddingRight: '1rem',
  }}
/>

<Button
  variant="contained"
  startIcon={<SearchIcon />}
  onClick={handleSearch}
  sx={{
    marginLeft: '-1rem',
  }}
>
  Search
</Button>




      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Exercise</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExercises.length > 0
              ? filteredExercises.map(({ category, exercise }) => (
                  <TableRow key={`${category}-${exercise}`}>
                    <TableCell>{category}</TableCell>
                    <TableCell>{exercise}</TableCell>
                  </TableRow>
                ))
              : Object.entries(fitnessExercises).map(([category, exerciseList]) =>
                  exerciseList.map((exercise) => (
                    <TableRow key={`${category}-${exercise}`}>
                      <TableCell>{category}</TableCell>
                      <TableCell>{exercise}</TableCell>
                    </TableRow>
                  ))
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FitnessTable;
