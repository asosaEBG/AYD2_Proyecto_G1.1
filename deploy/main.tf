provider "aws" {
  region = "us-east-1" # Change to your desired region
}

resource "aws_instance" "proyecto_ayd2" {
  ami           = "ami-04b70fa74e45c3917" # Change to your desired AMI
  instance_type = "t2.medium"
  key_name      = "1er-semestre-2024" # Change to your key pair name
  security_groups = ["launch-wizard-3"] 
}

resource "null_resource" "ansible_provisioner" {
  provisioner "local-exec" {
    command = "ansible-playbook -i '${aws_instance.proyecto_ayd2.public_ip},' -u ubuntu --private-key=/home/ubuntu/AYD2_Proyecto_G1.1/1er-semestre-2024.pem ansible_script.yml"
  }

  depends_on = [aws_instance.proyecto_ayd2]
}
