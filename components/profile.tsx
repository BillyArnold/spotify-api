import { UserProfile } from "@/app/page";
import Link from "next/link";

interface ProfileProps {
  profile: UserProfile;
}

const Profile = ({ profile }: ProfileProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl flex-grow">{profile.display_name}</h1>
      <Link href={profile.uri}>View on spotify</Link>
      <p>{profile.country}</p>
    </div>
  );
};

export default Profile;
