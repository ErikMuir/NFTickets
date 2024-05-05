import { useEffect, useState } from "react";
import useVenue from "@/lib/useVenue";
import { fetchStandardJson } from "@/lib/fetch-json";
import { Venue } from "@/models";
import { AccountProp } from "@/components/component-types";
import { Button } from "@/components/common/Button";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { TextField } from "@/components/common/TextField";
import { TextArea } from "@/components/common/TextArea";
import { Loading } from "@/components/common/Loading";

export default function VenueProfile({ account }: AccountProp) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [state, setState] = useState<string | undefined>();
  const [zip, setZip] = useState<string | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const { data, mutate, isLoading, error: swrError } = useVenue(account);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setAddress(data.address);
      setCity(data.city);
      setState(data.state);
      setZip(data.zip);
      setImageUrl(data.imageUrl);
    }
  }, [data]);

  useEffect(() => {
    setError(swrError || error);
  }, [swrError, error]);

  const submit = async () => {
    try {
      const venue = await fetchStandardJson<Venue>(`/api/venues/${account}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account,
          name,
          description: description || undefined,
          address: address || undefined,
          city: city || undefined,
          state: state || undefined,
          zip: zip || undefined,
          imageUrl: imageUrl || undefined,
        }),
      });
      mutate({ ...venue });
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
        value="Venue"
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
        id="address"
        label="Address"
        fullWidth
        value={address}
        onChange={(e) => {
          setAddress(e.target.value || undefined);
        }}
      />
      <TextField
        id="city"
        label="City"
        fullWidth
        value={city}
        onChange={(e) => {
          setCity(e.target.value || undefined);
        }}
      />
      <TextField
        id="state"
        label="State"
        fullWidth
        value={state}
        onChange={(e) => {
          setState(e.target.value || undefined);
        }}
      />
      <TextField
        id="zip"
        label="Zip"
        fullWidth
        value={zip}
        onChange={(e) => {
          setZip(e.target.value || undefined);
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
