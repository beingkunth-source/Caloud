export const regions = [
  { id: "us-east-1", name: "US East (N. Virginia)" },
  { id: "us-west-2", name: "US West (Oregon)" },
  { id: "eu-west-1", name: "Europe (Ireland)" },
  { id: "ap-south-1", name: "Asia Pacific (Mumbai)" }
] as const;

export const instanceTypes = [
  {
    id: "t3.micro",
    name: "t3.micro",
    vcpu: 2,
    memoryGb: 1,
    hourlyByRegion: {
      "us-east-1": 0.0104,
      "us-west-2": 0.0104,
      "eu-west-1": 0.0114,
      "ap-south-1": 0.0128
    }
  },
  {
    id: "t3.small",
    name: "t3.small",
    vcpu: 2,
    memoryGb: 2,
    hourlyByRegion: {
      "us-east-1": 0.0208,
      "us-west-2": 0.0208,
      "eu-west-1": 0.0228,
      "ap-south-1": 0.0256
    }
  },
  {
    id: "m6i.large",
    name: "m6i.large",
    vcpu: 2,
    memoryGb: 8,
    hourlyByRegion: {
      "us-east-1": 0.096,
      "us-west-2": 0.096,
      "eu-west-1": 0.107,
      "ap-south-1": 0.115
    }
  },
  {
    id: "c6i.large",
    name: "c6i.large",
    vcpu: 2,
    memoryGb: 4,
    hourlyByRegion: {
      "us-east-1": 0.085,
      "us-west-2": 0.085,
      "eu-west-1": 0.095,
      "ap-south-1": 0.102
    }
  }
] as const;

export const storageClasses = [
  { id: "s3-standard", name: "S3 Standard", monthlyPerGb: 0.023 },
  { id: "s3-standard-ia", name: "S3 Standard-IA", monthlyPerGb: 0.0125 },
  { id: "ebs-gp3", name: "EBS gp3", monthlyPerGb: 0.08 }
] as const;

export const bandwidthTiers = [
  { id: "internet-egress", name: "Internet data transfer out", monthlyPerGb: 0.09 }
] as const;
