import NominationForm from "@/components/NominationForm";
import VoteCount from "@/components/VoteCount";
import WinnerDisplay from "@/components/WinnerDisplay";

export default function HomePage() {
  return (
    <div className="space-y-8 py-10 px-4">
      <hr style={{ border: 'none', borderTop: '2px solid black' }} />

      <NominationForm />
      <hr style={{ border: 'none', borderTop: '2px solid black' }} />


       <center><VoteCount /></center>
       <hr style={{ border: 'none', borderTop: '2px solid black' }} />

      
      <center><WinnerDisplay /></center>
      <hr style={{ border: 'none', borderTop: '2px solid black' }} />

      
    </div>
  );
}
