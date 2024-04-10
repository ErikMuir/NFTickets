import { useEffect, useState } from "react";
import useEntertainer from "@/lib/useEntertainer";
import { Entertainer, EntertainerType } from "@/models";
import { Button } from "@/components/common/Button";
import { Loading } from "@/components/views/Loading";
import { AccountProp } from "@/components/types";
import { EntertainerTypeSelect } from "./FormControls/EntertainerTypeSelect";
import { NameTextField } from "./FormControls/NameTextField";
import { DescriptionTextField } from "./FormControls/DescriptionTextField";
import { IterationTextField } from "./FormControls/IterationTextField";
import { ImageUrlTextField } from "./FormControls/ImageUrlTextField";
import { ErrorMessage } from "@/components/common/ErrorMessage";

export default function EntertainerProfile({
  account,
}: AccountProp) {
  const [type, setType] = useState<EntertainerType>(EntertainerType.UNKNOWN);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>();
  const [iteration, setIteration] = useState<string | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { data, mutate, isLoading, error } = useEntertainer(account);

  useEffect(() => {
    if (data) {
      setType(data.type);
      setName(data.name);
      setDescription(data.description);
      setIteration(data.iteration);
      setImageUrl(data.imageUrl);
    }
  }, [data]);

  const submit = async () => {
    await mutate({
      account,
      name,
      type,
      description,
      iteration,
      imageUrl,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={submit} className="flex flex-col w-full items-center gap-4">
      <NameTextField value={name} setValue={setName} />
      <EntertainerTypeSelect value={type} setValue={setType} />
      <DescriptionTextField value={description} setValue={setDescription} />
      <IterationTextField value={iteration} setValue={setIteration} />
      <ImageUrlTextField value={imageUrl} setValue={setImageUrl} />
      <ErrorMessage message={error} />
      <Button size="large" fullWidth onClick={submit}>
        Submit
      </Button>
    </form>
  );
}
