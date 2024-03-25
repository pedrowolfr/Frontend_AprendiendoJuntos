


{myEnrollments.length > 0 && (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Matriculas</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {myEnrollments.map((enrollment, index) => (
          <Col key={index}>
            <Card className="h-100" id="custom-card-profile">
              <Card.Body>
                <Card.Title>Curso: {enrollment.course}</Card.Title>
                <Card.Text>
                  <span className="font-weight-bold">
                    Fecha de inscripción:
                  </span>{" "}
                  {enrollment.enrollment_date}
                  <br />
                  <span className="font-weight-bold">
                    Fecha de inicio:
                  </span>{" "}
                  {enrollment.start_date}
                  <br />
                  <span className="font-weight-bold">
                    Fecha de fin:
                  </span>{" "}
                  {enrollment.end_date}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() =>
                    enrollment.editable
                      ? handleSaveEnrollment(index)
                      : handleEditEnrollment(index)
                  }
                >
                  {enrollment.editable ? "Guardar" : "Editar"}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => cancelButtonHandler(enrollment.id)}
                >
                  Cancelar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )}
</>
</div>
);
};
