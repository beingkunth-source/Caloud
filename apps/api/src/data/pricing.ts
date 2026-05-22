export const regions = [
  { id: "us-east-1", name: "US East (N. Virginia)" },
  { id: "us-east-2", name: "US East (Ohio)" },
  { id: "us-west-1", name: "US West (N. California)" },
  { id: "us-west-2", name: "US West (Oregon)" },
  { id: "eu-west-1", name: "Europe (Ireland)" },
  { id: "eu-central-1", name: "Europe (Frankfurt)" },
  { id: "ap-south-1", name: "Asia Pacific (Mumbai)" },
  { id: "ap-northeast-1", name: "Asia Pacific (Tokyo)" },
  { id: "ap-southeast-1", name: "Asia Pacific (Singapore)" }
] as const;

export const instanceTypes = [
  {
    id: "t3.micro",
    name: "t3.micro",
    vcpu: 2,
    memoryGb: 1,
    hourlyByRegion: {
      "us-east-1": 0.0104,
      "us-east-2": 0.0104,
      "us-west-1": 0.0120,
      "us-west-2": 0.0104,
      "eu-west-1": 0.0114,
      "eu-central-1": 0.0122,
      "ap-south-1": 0.0128,
      "ap-northeast-1": 0.0132,
      "ap-southeast-1": 0.0124
    }
  },
  {
    id: "t3.small",
    name: "t3.small",
    vcpu: 2,
    memoryGb: 2,
    hourlyByRegion: {
      "us-east-1": 0.0208,
      "us-east-2": 0.0208,
      "us-west-1": 0.0240,
      "us-west-2": 0.0208,
      "eu-west-1": 0.0228,
      "eu-central-1": 0.0244,
      "ap-south-1": 0.0256,
      "ap-northeast-1": 0.0264,
      "ap-southeast-1": 0.0248
    }
  },
  {
    id: "t3.medium",
    name: "t3.medium",
    vcpu: 2,
    memoryGb: 4,
    hourlyByRegion: {
      "us-east-1": 0.0416,
      "us-east-2": 0.0416,
      "us-west-1": 0.0480,
      "us-west-2": 0.0416,
      "eu-west-1": 0.0456,
      "eu-central-1": 0.0488,
      "ap-south-1": 0.0512,
      "ap-northeast-1": 0.0528,
      "ap-southeast-1": 0.0496
    }
  },
  {
    id: "t3.large",
    name: "t3.large",
    vcpu: 2,
    memoryGb: 8,
    hourlyByRegion: {
      "us-east-1": 0.0832,
      "us-east-2": 0.0832,
      "us-west-1": 0.0960,
      "us-west-2": 0.0832,
      "eu-west-1": 0.0912,
      "eu-central-1": 0.0976,
      "ap-south-1": 0.1024,
      "ap-northeast-1": 0.1056,
      "ap-southeast-1": 0.0992
    }
  },
  {
    id: "m6i.large",
    name: "m6i.large",
    vcpu: 2,
    memoryGb: 8,
    hourlyByRegion: {
      "us-east-1": 0.0960,
      "us-east-2": 0.0960,
      "us-west-1": 0.1100,
      "us-west-2": 0.0960,
      "eu-west-1": 0.1070,
      "eu-central-1": 0.1140,
      "ap-south-1": 0.1150,
      "ap-northeast-1": 0.1200,
      "ap-southeast-1": 0.1120
    }
  },
  {
    id: "m6i.xlarge",
    name: "m6i.xlarge",
    vcpu: 4,
    memoryGb: 16,
    hourlyByRegion: {
      "us-east-1": 0.1920,
      "us-east-2": 0.1920,
      "us-west-1": 0.2200,
      "us-west-2": 0.1920,
      "eu-west-1": 0.2140,
      "eu-central-1": 0.2280,
      "ap-south-1": 0.2300,
      "ap-northeast-1": 0.2400,
      "ap-southeast-1": 0.2240
    }
  },
  {
    id: "m6i.2xlarge",
    name: "m6i.2xlarge",
    vcpu: 8,
    memoryGb: 32,
    hourlyByRegion: {
      "us-east-1": 0.3840,
      "us-east-2": 0.3840,
      "us-west-1": 0.4400,
      "us-west-2": 0.3840,
      "eu-west-1": 0.4280,
      "eu-central-1": 0.4560,
      "ap-south-1": 0.4600,
      "ap-northeast-1": 0.4800,
      "ap-southeast-1": 0.4480
    }
  },
  {
    id: "c6i.large",
    name: "c6i.large",
    vcpu: 2,
    memoryGb: 4,
    hourlyByRegion: {
      "us-east-1": 0.0850,
      "us-east-2": 0.0850,
      "us-west-1": 0.0980,
      "us-west-2": 0.0850,
      "eu-west-1": 0.0950,
      "eu-central-1": 0.1020,
      "ap-south-1": 0.1020,
      "ap-northeast-1": 0.1060,
      "ap-southeast-1": 0.0990
    }
  },
  {
    id: "c6i.xlarge",
    name: "c6i.xlarge",
    vcpu: 4,
    memoryGb: 8,
    hourlyByRegion: {
      "us-east-1": 0.1700,
      "us-east-2": 0.1700,
      "us-west-1": 0.1960,
      "us-west-2": 0.1700,
      "eu-west-1": 0.1900,
      "eu-central-1": 0.2040,
      "ap-south-1": 0.2040,
      "ap-northeast-1": 0.2120,
      "ap-southeast-1": 0.1980
    }
  },
  {
    id: "c6i.2xlarge",
    name: "c6i.2xlarge",
    vcpu: 8,
    memoryGb: 16,
    hourlyByRegion: {
      "us-east-1": 0.3400,
      "us-east-2": 0.3400,
      "us-west-1": 0.3920,
      "us-west-2": 0.3400,
      "eu-west-1": 0.3800,
      "eu-central-1": 0.4080,
      "ap-south-1": 0.4080,
      "ap-northeast-1": 0.4240,
      "ap-southeast-1": 0.3960
    }
  },
  {
    id: "r6i.large",
    name: "r6i.large",
    vcpu: 2,
    memoryGb: 16,
    hourlyByRegion: {
      "us-east-1": 0.1260,
      "us-east-2": 0.1260,
      "us-west-1": 0.1450,
      "us-west-2": 0.1260,
      "eu-west-1": 0.1410,
      "eu-central-1": 0.1500,
      "ap-south-1": 0.1510,
      "ap-northeast-1": 0.1580,
      "ap-southeast-1": 0.1470
    }
  },
  {
    id: "r6i.xlarge",
    name: "r6i.xlarge",
    vcpu: 4,
    memoryGb: 32,
    hourlyByRegion: {
      "us-east-1": 0.2520,
      "us-east-2": 0.2520,
      "us-west-1": 0.2900,
      "us-west-2": 0.2520,
      "eu-west-1": 0.2820,
      "eu-central-1": 0.3000,
      "ap-south-1": 0.3020,
      "ap-northeast-1": 0.3160,
      "ap-southeast-1": 0.2940
    }
  },
  {
    id: "r6i.2xlarge",
    name: "r6i.2xlarge",
    vcpu: 8,
    memoryGb: 64,
    hourlyByRegion: {
      "us-east-1": 0.5040,
      "us-east-2": 0.5040,
      "us-west-1": 0.5800,
      "us-west-2": 0.5040,
      "eu-west-1": 0.5640,
      "eu-central-1": 0.6000,
      "ap-south-1": 0.6040,
      "ap-northeast-1": 0.6320,
      "ap-southeast-1": 0.5880
    }
  },
  {
    id: "g5.xlarge",
    name: "g5.xlarge",
    vcpu: 4,
    memoryGb: 16,
    hourlyByRegion: {
      "us-east-1": 1.0060,
      "us-east-2": 1.0060,
      "us-west-1": 1.1570,
      "us-west-2": 1.0060,
      "eu-west-1": 1.1270,
      "eu-central-1": 1.2070,
      "ap-south-1": 1.2070,
      "ap-northeast-1": 1.2580,
      "ap-southeast-1": 1.1770
    }
  },
  {
    id: "g5.2xlarge",
    name: "g5.2xlarge",
    vcpu: 8,
    memoryGb: 32,
    hourlyByRegion: {
      "us-east-1": 1.2120,
      "us-east-2": 1.2120,
      "us-west-1": 1.3940,
      "us-west-2": 1.2120,
      "eu-west-1": 1.3580,
      "eu-central-1": 1.4540,
      "ap-south-1": 1.4540,
      "ap-northeast-1": 1.5150,
      "ap-southeast-1": 1.4180
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
