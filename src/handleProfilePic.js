import ProfilePictureSelection from './ProfilePictureSelection';

function SomeParentComponent() {
  const handlePictureSubmit = (pictureUrl) => {
    console.log(pictureUrl);
  };
return (
    <ProfilePictureSelection onPictureSubmit={handlePictureSubmit} />
  );
}

export default SomeParentComponent;