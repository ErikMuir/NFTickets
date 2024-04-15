import { useEffect, useState } from "react";
import useEntertainer from "@/lib/useEntertainer";
import { fetchStandardJson } from "@/lib/fetch-json";
import { Entertainer, EntertainerType } from "@/models";
import { AccountProp, SelectValue } from "@/components/componentTypes";
import { Button } from "@/components/common/Button";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Select } from "@/components/common/Select";
import { TextArea } from "@/components/common/TextArea";
import { TextField } from "@/components/common/TextField";
import { Loading } from "@/components/common/Loading";

export const entertainerTypeOptions: Record<string, SelectValue> = {
  Music: EntertainerType.MUSIC,
  Sports: EntertainerType.SPORTS,
  Comedy: EntertainerType.COMEDY,
};

export default function EntertainerProfile({ account }: AccountProp) {
  const [type, setType] = useState<EntertainerType>(EntertainerType.UNKNOWN);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>();
  const [iteration, setIteration] = useState<string | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const { data, mutate, isLoading, error: swrError } = useEntertainer(account);

  useEffect(() => {
    if (data) {
      setType(data.type);
      setName(data.name);
      setDescription(data.description);
      setIteration(data.iteration);
      setImageUrl(data.imageUrl);
    }
  }, [data]);

  useEffect(() => {
    setError(swrError || error);
  }, [swrError, error]);

  const submit = async () => {
    try {
      const entertainer = await fetchStandardJson<Entertainer>(
        `/api/entertainers/${account}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            account,
            name,
            type,
            description: description || undefined,
            iteration: iteration || undefined,
            imageUrl: imageUrl || undefined,
          }),
        }
      );
      mutate({ ...entertainer });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={submit} className="flex flex-col w-full items-center gap-4">
      <TextField
        id="role"
        label="Role"
        fullWidth
        value="Entertainer"
        onChange={() => {}}
        disabled
      />
      <TextField
        id="name"
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Select
        id="type"
        label="Type"
        fullWidth
        options={entertainerTypeOptions}
        value={type}
        onChange={(e) => {
          setType(e.target.value as EntertainerType);
        }}
      />
      <TextArea
        id="description"
        label="Description"
        fullWidth
        value={description}
        onChange={(e) => {
          setDescription(e.target.value || undefined);
        }}
      />
      <TextField
        id="iteration"
        label="Iteration"
        fullWidth
        value={iteration}
        onChange={(e) => {
          setIteration(e.target.value || undefined);
        }}
      />
      <TextField
        id="image-url"
        label="Image URL"
        fullWidth
        value={imageUrl}
        onChange={(e) => {
          setImageUrl(e.target.value || undefined);
        }}
      />
      <ErrorMessage message={error} />
      <Button size="large" fullWidth onClick={submit}>
        Submit
      </Button>
    </form>
  );
}
